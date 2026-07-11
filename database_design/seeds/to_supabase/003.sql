
create or replace function public.fn_can_manage_spmb()
returns boolean
language sql
stable
set search_path = public
as $$
    select (
        public.fn_is_high_level_admin() 
        or
        coalesce(
            (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[4]'::jsonb, false
        )
    ); 
$$;

create or replace function public.fn_sync_user_metadata()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    if old.username is distinct from new.username then
        update auth.users
        set raw_user_meta_data =
            coalesce(raw_user_meta_data, '{}'::jsonb)
            || jsonb_build_object(
                'username',
                new.username
            )
        where id = new.id;
    end if;

    return new;
end;
$$;

revoke execute on function public.fn_sync_user_metadata() from public, anon, authenticated;

drop trigger if exists tr_sync_user_metadata on public.profiles;

create trigger tr_sync_user_metadata
after update of username
on public.profiles
for each row
execute function public.fn_sync_user_metadata();

create or replace function public.fn_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

-- users table

drop trigger if exists trg_set_updated_at
on public.profiles;

create trigger trg_set_updated_at
before update on public.profiles
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.user_roles;

create trigger trg_set_updated_at
before update on public.user_roles
for each row
execute function public.fn_set_updated_at();


do $$
begin
    -- 1. jenis kelamin
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'gender_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.gender_enum as enum ('MALE', 'FEMALE', 'OTHER');
    end if;

    -- 2. status hidup orang tua / wali
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'life_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.life_status_enum as enum ('HIDUP', 'MENINGGAL', 'LAINNYA');
    end if;

    -- 3. tipe relasi keluarga
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'family_relation_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.family_relation_enum as enum ('AYAH', 'IBU', 'WALI');
    end if;

    -- 4. status kelengkapan formulir pendaftaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'registration_form_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.registration_form_status_enum as enum ('DRAFT', 'FINALIZED');
    end if;

    -- 5. status keputusan akhir pendaftaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'admission_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.admission_status_enum as enum ('PROCESS', 'AWAITING', 'ACCEPTED', 'REJECTED');
    end if;

    -- 6. semester
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'semester_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.semester_enum as enum ('GANJIL', 'GENAP');
    end if;

    -- 7. status pembayaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'payment_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.payment_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 8. status verifikasi dokumen
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'document_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.document_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 9. status publikasi postingan
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'post_status' 
          and nsp.nspname = 'public'
    ) then
        create type public.post_status as enum ('DRAFT', 'PUBLISHED');
    end if;

    -- 10. jenis operasi pada audit trail
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'audit_operation_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.audit_operation_enum as enum ('INSERT', 'UPDATE', 'SOFT_DELETE', 'DELETE');
    end if;

    -- 11. agama
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'agama_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.agama_enum as enum ('ISLAM', 'KRISTEN', 'KATOLIK', 'BUDHA', 'HINDU', 'KONGHUCHU');
    end if;

end $$;