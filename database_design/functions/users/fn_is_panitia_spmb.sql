create or replace function public.fn_is_panitia_spmb()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 
    from public.user_roles
    where user_id = auth.uid()
    and role_id = 4
  );
$$;

revoke execute on function public.fn_is_panitia_spmb from public;
grant execute on function public.fn_is_panitia_spmb to authenticated;