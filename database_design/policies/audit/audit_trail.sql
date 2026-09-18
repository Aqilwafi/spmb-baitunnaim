-- policies/audit/audit_trail.sql

drop policy if exists "RLS: audit_trail: select"
on public.audit_trail;

create policy "RLS: audit_trail: select"
on public.audit_trail
for select
using (
    public.fn_is_administrator()
);
