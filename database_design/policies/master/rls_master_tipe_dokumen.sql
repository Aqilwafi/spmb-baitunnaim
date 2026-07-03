-- policies/master/rls_master_tipe_dokumen.sql

drop policy if exists "RLS: master_tipe_dokumen: select"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: select"
on public.master_tipe_dokumen
for select
using (
    public.can_read_master_data(is_active)
);

drop policy if exists "RLS: master_tipe_dokumen: insert"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: insert"
on public.master_tipe_dokumen
for insert
with check (
    public.is_high_level_admin()
);

drop policy if exists "RLS: master_tipe_dokumen: update"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: update"
on public.master_tipe_dokumen
for update
with check (
   public.is_high_level_admin()
);

drop policy if exists "RLS: master_tipe_dokumen: delete"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: delete"
on public.master_tipe_dokumen
for delete
with check (
   public.is_high_level_admin()
);

