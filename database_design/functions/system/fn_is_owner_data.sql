create or replace function public.fn_is_owner_data(p_owner_id uuid)
returns boolean
language sql
stable
set search_path = public
as $$
  select auth.uid() = p_owner_id;
$$;