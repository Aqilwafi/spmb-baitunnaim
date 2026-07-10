create or replace function public.fn_is_high_level_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select 
    public.fn_is_superadmin()
    or
    public.fn_is_administrator();
$$;