create or replace function public.fn_is_superadmin()
returns boolean
language sql
stable
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[1]'::jsonb, false
  );
$$;