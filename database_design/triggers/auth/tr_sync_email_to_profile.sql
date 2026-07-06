drop trigger if exists tr_sync_email_to_profile on auth.users;

create trigger tr_sync_email_to_profile
after update of email
on auth.users
for each row
execute function public.fn_sync_email_to_profile();