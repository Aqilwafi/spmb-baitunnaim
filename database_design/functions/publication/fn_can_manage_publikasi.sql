create or replace function public.fn_can_manage_publikasi()
returns boolean
language sql
stable
set search_path = public
as $$
    select (
        public.fn_is_high_level_admin() 
        or
        coalesce(
            (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[4]'::jsonb, false
        )
    ); 
$$;