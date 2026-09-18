-- policies/authority/rls_user_roles.sql

alter table public.user_roles enable row level security;

drop policy if exists "RLS: user_roles: select"
on public.user_roles;

create policy "RLS: user_roles: select"
on public.user_roles
for select
using (
    public.fn_is_administrator()
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

drop policy if exists "RLS: user_roles: delete"
on public.user_roles;

create policy "RLS: user_roles: delete"
on public.user_roles
for delete
using (
    public.fn_can_manage_user_role(role_id)
);

