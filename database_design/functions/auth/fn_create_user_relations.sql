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
    v_username text; -- Variabel untuk menampung username
begin
    -- 1. Deteksi apakah ini aksi dari Admin API / Service Role
    if current_setting('request.jwt.claim.role', true) in ('service_role', 'supabase_auth_admin') 
        or current_user in ('postgres', 'supabase_admin') then
        v_is_admin_action := true;
    end if;

    -- 2. Ambil role_id jika ada (khusus admin)
    if v_is_admin_action then
        begin
            v_input_role_id := (new.raw_user_meta_data->> 'role_id')::bigint;
        exception when others then
            v_input_role_id := null;
        end;
    end if;

    -- Ambil username dari metadata (berlaku untuk invite maupun signUp)
    v_username := new.raw_user_meta_data ->> 'username';

    -- 3. Validasi role_id master_roles...
    if v_input_role_id is not null then
        select id into v_role_id
        from public.master_roles
        where id = v_input_role_id;
    end if;

    -- 4. Fallback ke 'PENDAFTAR' jika role kosong
    if v_role_id is null then
        select id
        into v_role_id
        from public.master_roles
        where code = 'PENDAFTAR';

        if not found then
            raise exception 'default role "PENDAFTAR" not found';
        end if;
    end if;

    -- 5. Buat profile (Sertakan email dan username)
    insert into public.profiles (
        id,
        email,
        username
    )
    values (
        new.id,
        new.email,
        v_username
    )
    on conflict (id) do update 
    set email = excluded.email,
        username = coalesce(excluded.username, public.profiles.username);

    -- 6. Buat relasi role
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

revoke execute on function public.fn_create_user_relations() from public, anon, authenticated;