create or replace function public.fn_is_administrator()
returns boolean
language sql
stable
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[2]'::jsonb, false
  );
$$;