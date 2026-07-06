create or replace function public.fn_sync_email_to_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    if old.email is distinct from new.email then
        update public.profiles
        set email = new.email
        where id = new.id;
    end if;

    return new;
end;
$$;