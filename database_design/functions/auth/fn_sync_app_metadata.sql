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