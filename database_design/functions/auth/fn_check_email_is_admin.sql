create or replace function public.fn_check_email_is_admin(p_email text)
returns boolean
language plpgsql
security definer -- Privilase tinggi untuk baca auth.users
set search_path = public, auth
as $$
begin
  return exists (
    select 1
    from auth.users u
    join public.user_roles ur on ur.user_id = u.id
    join public.master_roles mr on mr.id = ur.role_id
    where u.email = p_email
      and mr.code in ('ADMINISTRATOR', 'SUPERADMIN', 'VERIFIKATOR', 'PUBLIKATOR')
  );
end;
$$;

-- Cabut akses API agar TIDAK terekspos ke publik
revoke execute on function public.fn_check_email_is_admin from public;
revoke execute on function public.fn_check_email_is_admin from anon, authenticated;

-- not expoesed API