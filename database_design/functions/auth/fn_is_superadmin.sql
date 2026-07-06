create or replace function public.fn_is_superadmin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'role_id')::jsonb @> '[1]'::jsonb, false
  );
$$;