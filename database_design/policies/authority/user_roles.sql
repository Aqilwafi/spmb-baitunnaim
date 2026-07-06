-- policies/authority/rls_user_roles.sql

drop policy if exists "RLS: user_roles: select"
on public.user_roles;

create policy "RLS: user_roles: select"
on public.user_roles
for select
using (
    public.is_high_level_admin()
    or
    user_id = auth.uid()
);

drop policy if exists "RLS: user_roles: insert"
on public.user_roles;

create policy "RLS: user_roles: insert"
on public.user_roles
for insert
with check (   
    public.can_manage_user_role(role_id)
);

drop policy if exists "RLS: user_roles: update"
on public.user_roles;

create policy "RLS: user_roles: update"
on public.user_roles
for update  
using (
    public.can_manage_user_role(role_id)
)
with check (
    public.can_manage_user_role(    role_id)
);

drop policy if exists "RLS: user_roles: delete"
on public.user_roles;

create policy "RLS: user_roles: delete"
on public.user_roles
for delete
using (false); 

