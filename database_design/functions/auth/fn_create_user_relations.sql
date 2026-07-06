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
        id,
        email
    )
    values (
        new.id,
        new.email
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