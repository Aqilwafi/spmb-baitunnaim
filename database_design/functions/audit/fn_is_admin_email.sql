create or replace function public.fn_is_admin_email(check_email text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  target_user_id uuid;
  result boolean;
begin
  -- Step 1: ambil id dari email via auth.users
  select id into target_user_id
  from auth.users
  where email = check_email;

  if target_user_id is null then
    return false;
  end if;

  -- Step 2: cek apakah user_id ini punya salah satu role "admin-level"
  select exists (
    select 1
    from user_roles ur
    join master_roles mr on mr.id = ur.role_id
    where ur.user_id = target_user_id
    and mr.code in ('ADMINISTRATOR', 'SUPERADMIN', 'VERIFIKATOR', 'PUBLIKATOR')
  ) into result;

  return result;
end;
$$;

revoke execute on function public.is_admin_email from public;
grant execute on function public.is_admin_email to anon, authenticated;