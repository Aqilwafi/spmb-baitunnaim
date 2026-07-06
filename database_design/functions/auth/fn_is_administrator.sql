create or replace function public.fn_is_administrator()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'role_id')::jsonb @> '[2]'::jsonb, false
  );
$$;