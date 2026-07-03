-- policies/master/rls_master_lembaga.sql

drop policy if exists "RLS: master_lembaga: select"
on public.master_lembaga;

create policy "RLS: master_lembaga: select"
on public.master_lembaga
for select
using (
    public.can_read_master_data(is_active)
);

drop policy if exists "RLS: master_lembaga: insert"
on public.master_lembaga;

create policy "RLS: master_lembaga: insert"
on public.master_lembaga
for insert
with check (
    public.is_high_level_admin()
);

drop policy if exists "RLS: master_lembaga: update"
on public.master_lembaga;

create policy "RLS: master_lembaga: update"
on public.master_lembaga
for update
with check (
   public.is_high_level_admin()
);

drop policy if exists "RLS: master_lembaga: delete"
on public.master_lembaga;

create policy "RLS: master_lembaga: delete"
on public.master_lembaga
for delete
with check (
   public.is_high_level_admin()
);

