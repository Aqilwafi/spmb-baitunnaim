drop trigger if exists tr_before_auth_user_created on auth.users;

create trigger tr_before_auth_user_created
before insert on auth.users
for each row
execute function public.fn_prepare_new_user();