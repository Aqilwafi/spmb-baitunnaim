drop trigger if exists tr_sync_username_to_auth on public.profiles;

create trigger tr_sync_username_to_auth
after update of username
on public.profiles
for each row
execute function public.fn_sync_username_to_auth();