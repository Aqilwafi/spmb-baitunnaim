-- policies/master/rls_master_tahun_ajaran.sql

drop policy if exists "RLS: master_tahun_ajaran: select"
on public.master_tahun_ajaran;

create policy "RLS: master_tahun_ajaran: select"
on public.master_tahun_ajaran
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_tahun_ajaran: insert"
on public.master_tahun_ajaran;

create policy "RLS: master_tahun_ajaran: insert"
on public.master_tahun_ajaran
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tahun_ajaran: update"
on public.master_tahun_ajaran;

create policy "RLS: master_tahun_ajaran: update"
on public.master_tahun_ajaran
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tahun_ajaran: delete"
on public.master_tahun_ajaran;

create policy "RLS: master_tahun_ajaran: delete"
on public.master_tahun_ajaran
for delete
using (
    public.fn_is_high_level_admin()
);

-- policies/master/rls_master_tinggal_bersama.sql

drop policy if exists "RLS: master_tinggal_bersama: select"
on public.master_tinggal_bersama;

create policy "RLS: master_tinggal_bersama: select"
on public.master_tinggal_bersama
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_tinggal_bersama: insert"
on public.master_tinggal_bersama;

create policy "RLS: master_tinggal_bersama: insert"
on public.master_tinggal_bersama
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tinggal_bersama: update"
on public.master_tinggal_bersama;

create policy "RLS: master_tinggal_bersama: update"
on public.master_tinggal_bersama
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tinggal_bersama: delete"
on public.master_tinggal_bersama;

create policy "RLS: master_tinggal_bersama: delete"
on public.master_tinggal_bersama
for delete
using (
    public.fn_is_high_level_admin()
);

-- policies/master/rls_master_tipe_dokumen.sql

drop policy if exists "RLS: master_tipe_dokumen: select"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: select"
on public.master_tipe_dokumen
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_tipe_dokumen: insert"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: insert"
on public.master_tipe_dokumen
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tipe_dokumen: update"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: update"
on public.master_tipe_dokumen
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_tipe_dokumen: delete"
on public.master_tipe_dokumen;

create policy "RLS: master_tipe_dokumen: delete"
on public.master_tipe_dokumen
for delete
using (
    public.fn_is_high_level_admin()
);

