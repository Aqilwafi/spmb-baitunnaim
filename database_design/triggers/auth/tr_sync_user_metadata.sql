drop trigger if exists tr_sync_user_metadata on public.profiles;

create trigger tr_sync_user_metadata
after update of username
on public.profiles
for each row
execute function public.fn_sync_user_metadata();