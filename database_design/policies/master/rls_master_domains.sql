-- policies/master/rls_master_domains.sql

drop policy if exists "RLS: master_domains: select"
on public.master_domains;

create policy "RLS: master_domains: select"
on public.master_domains
for select
using (
    public.can_read_master_data(is_active)
);

drop policy if exists "RLS: master_domains: insert"
on public.master_domains;

create policy "RLS: master_domains: insert"
on public.master_domains
for insert
with check (
    public.is_high_level_admin()
);

drop policy if exists "RLS: master_domains: update"
on public.master_domains;

create policy "RLS: master_domains: update"
on public.master_domains
for update
with check (
   public.is_high_level_admin()
);

drop policy if exists "RLS: master_domains: delete"
on public.master_domains;

create policy "RLS: master_domains: delete"
on public.master_domains
for delete
with check (
   public.is_high_level_admin()
);

