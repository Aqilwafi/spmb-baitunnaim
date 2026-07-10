
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
    (
      coalesce(
        (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[1, 2]'::jsonb, false
      )
    );
$$;

create or replace function public.fn_can_read_master_data(
    p_is_active boolean
)
returns boolean
language sql
stable
set search_path = public
as $$
    select
        public.fn_is_high_level_admin()
        or (
            auth.uid() is not null 
            and p_is_active
        );
$$;

drop trigger if exists tr_after_auth_user_created on auth.users;

create trigger tr_after_auth_user_created
after insert on auth.users
for each row
execute function public.fn_create_user_relations();

drop trigger if exists tr_before_auth_user_created on auth.users;

create trigger tr_before_auth_user_created
before insert on auth.users
for each row
execute function public.fn_prepare_new_user();

drop trigger if exists tr_sync_app_metadata on public.user_roles;

create trigger tr_sync_app_metadata
after insert or update or delete
on public.user_roles
for each row
execute function public.fn_sync_app_metadata();

-- policies/authority/rls_profiles.sql

alter table public.profiles enable row level security;

drop policy if exists "RLS: profiles: select"
on public.profiles;

create policy "RLS: profiles: select"
on public.profiles
for select
using (
    public.fn_is_high_level_admin()
    or
    id = auth.uid()
);

drop policy if exists "RLS: profiles: insert"
on public.profiles;

create policy "RLS: profiles: insert"
on public.profiles
for insert
with check (false);

drop policy if exists "RLS: profiles: update"
on public.profiles;

create policy "RLS: profiles: update"
on public.profiles
for update  
using (
    public.fn_is_high_level_admin()
    or
    id = auth.uid()
)
with check (
    public.fn_is_high_level_admin()
    or
    id = auth.uid()
);

drop policy if exists "RLS: profiles: delete"
on public.profiles;

create policy "RLS: profiles: delete"
on public.profiles
for delete
using (false); -- tidak boleh delete profile, harus delete user di auth.users sekalian 2 fungsi.

-- policies/authority/rls_user_roles.sql

alter table public.user_roles enable row level security;

drop policy if exists "RLS: user_roles: select"
on public.user_roles;

create policy "RLS: user_roles: select"
on public.user_roles
for select
using (
    public.fn_is_high_level_admin()
    or
    user_id = auth.uid()
);

drop policy if exists "RLS: user_roles: insert"
on public.user_roles;

create policy "RLS: user_roles: insert"
on public.user_roles
for insert
with check (   
    public.fn_can_manage_user_role(role_id)
);

drop policy if exists "RLS: user_roles: update"
on public.user_roles;

create policy "RLS: user_roles: update"
on public.user_roles
for update  
using (
    public.fn_can_manage_user_role(role_id)
)
with check (
    public.fn_can_manage_user_role(role_id)
);

drop policy if exists "RLS: user_roles: delete"
on public.user_roles;

create policy "RLS: user_roles: delete"
on public.user_roles
for delete
using (false); 

-- policies/master/rls_master_roles.sql

alter table public.master_roles enable row level security;

drop policy if exists "RLS: master_roles: select"
on public.master_roles;

create policy "RLS: master_roles: select"
on public.master_roles
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_roles: insert"
on public.master_roles;

create policy "RLS: master_roles: insert"
on public.master_roles
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_roles: update"
on public.master_roles;

create policy "RLS: master_roles: update"
on public.master_roles
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_roles: delete"
on public.master_roles;

create policy "RLS: master_roles: delete"
on public.master_roles
for delete
using (
   public.fn_is_high_level_admin()
);