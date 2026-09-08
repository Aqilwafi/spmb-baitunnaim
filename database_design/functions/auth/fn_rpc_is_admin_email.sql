create or replace function public.fn_rpc_is_admin_email(p_email text)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  if p_email is null or trim(p_email) = '' then
    return false;
  end if;

  -- Memanggil fungsi Definer internal di dalam database
  return public.fn_check_email_is_admin(p_email);
end;
$$;

-- Ekspo HANYA wrapper ini ke API
revoke execute on function public.fn_rpc_is_admin_email from public;
grant execute on function public.fn_rpc_is_admin_email to anon, authenticated;

-- exposed API (Data API)