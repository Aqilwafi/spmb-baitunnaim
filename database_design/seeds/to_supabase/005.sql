
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