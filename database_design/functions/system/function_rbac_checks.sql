create or replace function public.is_superadmin()
returns boolean
language sql
stable
as $$
  select (auth.jwt() -> 'app_metadata' ->> 'role_id')::int = 1;
$$;

create or replace function public.is_administrator()
returns boolean
language sql
stable
as $$
  select (auth.jwt() -> 'app_metadata' ->> 'role_id')::int = 2;
$$;

create or replace function public.is_high_level_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select 
    public.is_superadmin()
    or
    public.is_administrator();
$$;

create or replace function public.can_manage_user_role(
    p_target_role_id smallint
)
returns boolean
language sql
stable
as $$
  select 
    p_target_role_id not in (1, 2)
    and 
    (
      (auth.jwt() -> 'app_metadata' -> 'access_rights') @> jsonb_build_array(jsonb_build_object( 'role_id', 1))
      or
      (auth.jwt() -> 'app_metadata' -> 'access_rights') @> jsonb_build_array(jsonb_build_object('role_id', 2))
    );
$$;