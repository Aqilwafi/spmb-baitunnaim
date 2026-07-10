-- policies/audit/audit_trail.sql

drop policy if exists "RLS: audit_trail: select"
on public.audit_trail;

create policy "RLS: audit_trail: select"
on public.audit_trail
for select
using (
    public.is_high_level_admin()
);

drop policy if exists "RLS: audit_trail: insert"
on public.audit_trail;

create policy "RLS: audit_trail: insert"
on public.audit_trail
for insert
with check (false);

drop policy if exists "RLS: audit_trail: update"
on public.audit_trail;

create policy "RLS: audit_trail: update"
on public.audit_trail
for update  
using (false);

drop policy if exists "RLS: audit_trail: delete"
on public.audit_trail;

create policy "RLS: audit_trail: delete"
on public.audit_trail
for delete
using (false); -- tidak boleh delete audit_trail, harus delete user di auth.users sekalian 2 fungsi.

