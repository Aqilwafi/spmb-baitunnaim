create extension if not exists "pgcrypto";

do $$
begin
    -- 1. format nik: wajib berupa angka dan tepat 16 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nik' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nik as text
        check (
            value ~ '^[0-9]{16}$'
        );
    end if;

    -- 2. format nomor kartu keluarga (kk): wajib berupa angka dan tepat 16 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_kk' and nsp.nspname = 'public'
    ) then
        create domain public.dom_kk as text
        check (
            value ~ '^[0-9]{16}$'
        );
    end if;

    -- 3. format nisn: wajib berupa angka dan tepat 10 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nisn' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nisn as text
        check (
            value ~ '^[0-9]{10}$'
        );
    end if;

    -- 4. format nomor handphone indonesia
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nomor_hp' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nomor_hp as text
        check (
            value ~ '^(08|\+628|628)[0-9]{9,13}$'
        );
    end if;

    -- 5. format npsn: wajib alfanumerik (atau angka) dan tepat 8 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_npsn' and nsp.nspname = 'public'
    ) then
        create domain public.dom_npsn as text
        check (
            value ~ '^[a-zA-r0-9]{8}$'
        );
    end if;

end $$;

-- ---------------------------------------------------------
-- master_roles
-- ---------------------------------------------------------
create table if not exists master_roles (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_roles is
'System roles used for RBAC.';

insert into master_roles (code, label, description) values
    ('SUPERADMIN', 'Super Administrator', 'Full system access'),
    ('ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    ('PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    ('VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    ('PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
on conflict (id) do nothing;

create table if not exists public.profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    account_name varchar(150),
    phone       public.dom_nomor_hp unique,
    avatar_url  text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);
comment on table profiles is 'Profil pengguna, 1:1 dengan auth.users. Disinkronkan via functions/auth.';

create table if not exists public.user_roles (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references public.profiles(id) on delete cascade,
    role_id     smallint not null references public.master_roles(id) on delete restrict,
    is_active   boolean     not null default true,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now(),
    constraint uq_user_role_domain unique (user_id, role_id)
);
comment on table public.user_roles is 'Pemetaan role per user per domain. Contoh: Ahmad = VERIFIKATOR@SPMB, PUBLIKATOR@PUBLIKASI.';

create or replace function public.fn_create_user_relations()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    v_role_id bigint;
begin
    -- ambil role default
    select id
    into v_role_id
    from public.master_roles
    where code = 'PENDAFTAR';

    if not found then
        raise exception 'default role "PENDAFTAR" not found';
    end if;

    -- buat profile
    insert into public.profiles (
        id
    )
    values (
        new.id
    )
    on conflict (id) do nothing;

    -- buat relasi role
    insert into public.user_roles (
        user_id,
        role_id
    )
    values (
        new.id,
        v_role_id
    )
    on conflict (user_id, role_id) do nothing;

    return new;
end;
$$;

-- Cabut akses publik untuk fungsi fn_create_user_relations
revoke execute on function public.fn_create_user_relations() from public, anon, authenticated;

create or replace function public.fn_prepare_new_user()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    -- pastikan username selalu tersedia
    new.raw_user_meta_data :=
        coalesce(new.raw_user_meta_data, '{}'::jsonb)
        || jsonb_build_object(
            'username',
            coalesce(
                nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
                split_part(new.email, '@', 1)
            )
        );

    return new;
end;
$$;

create or replace function public.fn_sync_app_metadata()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    v_user_id uuid;
    v_access_rights jsonb;
begin
    -- tentukan user yang terdampak
    if tg_op = 'DELETE' then
        v_user_id := old.user_id;
    else
        v_user_id := new.user_id;
    end if;

    -- ambil seluruh role yang aktif
    select coalesce(
        jsonb_agg(role_id order by role_id),
        '[]'::jsonb
    )
    into v_access_rights
    from public.user_roles
    where user_id = v_user_id
      and is_active = true;

    -- sinkronkan ke auth.users
    update auth.users
    set raw_app_meta_data =
        coalesce(raw_app_meta_data, '{}'::jsonb)
        || jsonb_build_object(
            'access_rights',
            v_access_rights
        )
    where id = v_user_id;

    return null;
end;
$$;

-- Cabut akses publik untuk fungsi fn_sync_app_metadata
revoke execute on function public.fn_sync_app_metadata() from public, anon, authenticated;