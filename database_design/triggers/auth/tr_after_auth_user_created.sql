drop trigger if exists tr_after_auth_user_created on auth.users;

create trigger tr_after_auth_user_created
after insert on auth.users
for each row
execute function public.fn_create_user_relations();