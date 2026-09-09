create or replace function public.fn_check_email_is_admin(p_email text)
returns boolean
language plpgsql
security definer -- Privilese tinggi untuk membaca auth.users & public tables
set search_path = public, auth
as $$
begin
  if p_email is null or trim(p_email) = '' then
    return false;
  end if;

  return exists (
    select 1
    from auth.users u
    join public.user_roles ur on ur.user_id = u.id
    join public.master_roles mr on mr.id = ur.role_id
    where lower(u.email) = lower(trim(p_email))
      and mr.code in ('ADMINISTRATOR', 'SUPERADMIN', 'VERIFIKATOR', 'PUBLIKATOR')
  );
end;
$$;

-- 3. CABUT TOTAL akses dari publik, anonim, dan user biasa (Supabase Data API / REST)
revoke all on function public.fn_check_email_is_admin(text) from public;
revoke execute on function public.fn_check_email_is_admin(text) from anon, authenticated;