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