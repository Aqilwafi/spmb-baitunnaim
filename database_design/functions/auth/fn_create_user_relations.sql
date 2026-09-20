create or replace function public.fn_create_user_relations()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    v_role_id bigint;
    v_input_role_id bigint;
    v_is_admin_action boolean := false;
begin
    -- 1. Deteksi apakah ini aksi dari Admin API / Service Role (Invite Admin)
    if current_setting('request.jwt.claim.role', true) in ('service_role', 'supabase_auth_admin') 
       or current_user in ('postgres', 'supabase_admin') then
        v_is_admin_action := true;
    end if;

    -- 2. Jika ini aksi admin, coba ambil role_id dari raw_user_meta_data
    if v_is_admin_action then
        begin
            v_input_role_id := (new.raw_user_meta_data->> 'role_id')::bigint;
        exception when others then
            v_input_role_id := null;
        end;
    end if;

    -- 3. Jika ada input role dari admin, validasi keberadaannya di master_roles
    if v_input_role_id is not null then
        select id into v_role_id
        from public.master_roles
        where id = v_input_role_id;
    end if;

    -- 4. Jika BUKAN aksi admin (publik) ATAU role dari metadata tidak ditemukan,
    -- fallback wajib ke role default ('PENDAFTAR')
    if v_role_id is null then
        select id
        into v_role_id
        from public.master_roles
        where code = 'PENDAFTAR';

        if not found then
            raise exception 'default role "PENDAFTAR" not found';
        end if;
    end if;

    -- 5. Buat profile
    insert into public.profiles (
        id
    )
    values (
        new.id
    )
    on conflict (id) do nothing;

    -- 6. Buat relasi role (menggunakan role kustom dari admin atau default 'PENDAFTAR')
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

-- Pastikan hak akses publik tetap dicabut
revoke execute on function public.fn_create_user_relations() from public, anon, authenticated;