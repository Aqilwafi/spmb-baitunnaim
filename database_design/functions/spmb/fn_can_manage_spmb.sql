create or replace function public.fn_can_manage_spmb()
returns boolean
language sql
stable
set search_path = public
as $$
  select
    public.fn_is_administrator()
    or
    public.fn_is_panitia_spmb();
$$;

revoke execute on function public.fn_can_manage_spmb() from public;
grant execute on function public.fn_can_manage_spmb() to authenticated;
