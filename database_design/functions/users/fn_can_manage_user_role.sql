create or replace function public.fn_can_manage_user_role(
    p_target_role_id smallint
)
returns boolean
language sql
stable
set search_path = public
as $$
  select 
    p_target_role_id not in (1, 2)
    and 
    public.fn_is_administrator
$$;

revoke execute on function public.fn_can_manage_user_role from public;
grant execute on function public.fn_can_manage_user_role to authenticated;