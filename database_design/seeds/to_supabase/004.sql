insert into master_kelas (id, code, label) values
    (1, 'MI01', 'Kelas 1'),
    (2, 'MI02', 'Kelas 2'),
    (3, 'MI03', 'Kelas 3'),
    (4, 'MI04', 'Kelas 4'),
    (5, 'MI05', 'Kelas 5'),
    (6, 'MI06', 'Kelas 6')
on conflict (label) do nothing;

insert into master_tahun_ajaran (code, tahun_mulai, tahun_selesai, semester, is_active) values
    ('2025-2', 2025, 2026, 'GENAP', false),
    ('2026-1', 2026, 2027, 'GANJIL', true),
    ('2026-2', 2026, 2027, 'GENAP', false)
on conflict (tahun_mulai, tahun_selesai, semester) do nothing;

insert into master_tipe_dokumen (id, code, label) values
    (1, 'KK_TYPE_DOC', 'Kartu Keluarga'),
    (2, 'KTP_TYPE_DOC', 'Kartu Tanda Penduduk'),
    (3, 'AKTE_TYPE_DOC', 'Akte Kelahiran')
on conflict (code) do nothing;

insert into master_status_rumah (id, code, label) values
    (1, 'NENEK', 'Nenek'),
    (2, 'ORTU', 'Orang Tua'),
    (3, 'SAUDARA', 'Saudara'),
    (4, 'DINAS', 'Dinas'),
    (5, 'SEWA', 'Sewa/Kontrak')
on conflict (code) do nothing;

insert into master_tinggal_bersama (id, code, label) values
    (1, 'ORTU', 'Orang Tua'),
    (2, 'SAUDARA', 'Saudara'),
    (3, 'WALI', 'Wali'),
    (4, 'PANTI', 'Panti'),
    (5, 'PESANTREN', 'Pesantren')
on conflict (code) do nothing;

-- policies/master/rls_master_categories.sql

drop policy if exists "RLS: master_categories: select"
on public.master_categories;

create policy "RLS: master_categories: select"
on public.master_categories
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_categories: insert"
on public.master_categories;

create policy "RLS: master_categories: insert"
on public.master_categories
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_categories: update"
on public.master_categories;

create policy "RLS: master_categories: update"
on public.master_categories
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_categories: delete"
on public.master_categories;

create policy "RLS: master_categories: delete"
on public.master_categories
for delete
using (
    public.fn_is_high_level_admin()
);

-- policies/master/rls_master_kelas.sql

drop policy if exists "RLS: master_kelas: select"
on public.master_kelas;

create policy "RLS: master_kelas: select"
on public.master_kelas
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_kelas: insert"
on public.master_kelas;

create policy "RLS: master_kelas: insert"
on public.master_kelas
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_kelas: update"
on public.master_kelas;

create policy "RLS: master_kelas: update"
on public.master_kelas
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_kelas: delete"
on public.master_kelas;

create policy "RLS: master_kelas: delete"
on public.master_kelas
for delete
using (
    public.fn_is_high_level_admin()
);

-- policies/master/rls_master_lembaga.sql

drop policy if exists "RLS: master_lembaga: select"
on public.master_lembaga;

create policy "RLS: master_lembaga: select"
on public.master_lembaga
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_lembaga: insert"
on public.master_lembaga;

create policy "RLS: master_lembaga: insert"
on public.master_lembaga
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_lembaga: update"
on public.master_lembaga;

create policy "RLS: master_lembaga: update"
on public.master_lembaga
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_lembaga: delete"
on public.master_lembaga;

create policy "RLS: master_lembaga: delete"
on public.master_lembaga
for delete
using (
    public.fn_is_high_level_admin()
);

-- policies/master/rls_master_status_rumah.sql

drop policy if exists "RLS: master_status_rumah: select"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: select"
on public.master_status_rumah
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_status_rumah: insert"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: insert"
on public.master_status_rumah
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_status_rumah: update"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: update"
on public.master_status_rumah
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_status_rumah: delete"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: delete"
on public.master_status_rumah
for delete
using (
    public.fn_is_high_level_admin()
);