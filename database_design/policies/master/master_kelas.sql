-- policies/master/rls_master_kelas.sql

drop policy if exists "RLS: master_kelas: select"
on public.master_kelas;

create policy "RLS: master_kelas: select"
on public.master_kelas
for select
using (
    public.can_read_master_data(is_active)
);

drop policy if exists "RLS: master_kelas: insert"
on public.master_kelas;

create policy "RLS: master_kelas: insert"
on public.master_kelas
for insert
with check (
    public.is_high_level_admin()
);

drop policy if exists "RLS: master_kelas: update"
on public.master_kelas;

create policy "RLS: master_kelas: update"
on public.master_kelas
for update
with check (
   public.is_high_level_admin()
);

drop policy if exists "RLS: master_kelas: delete"
on public.master_kelas;

create policy "RLS: master_kelas: delete"
on public.master_kelas
for delete
with check (
   public.is_high_level_admin()
);

