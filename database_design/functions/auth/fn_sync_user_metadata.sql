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