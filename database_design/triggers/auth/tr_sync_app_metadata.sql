drop trigger if exists tr_sync_app_metadata on public.user_roles;

create trigger tr_sync_app_metadata
after insert or update or delete
on public.user_roles
for each row
execute function public.fn_sync_app_metadata();