
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

-- policies/master/rls_master_step.sql

drop policy if exists "RLS: master_step: select"
on public.master_step;

create policy "RLS: master_step: select"
on public.master_step
for select
using (
    public.fn_can_read_master_data(is_active)
);

drop policy if exists "RLS: master_step: insert"
on public.master_step;

create policy "RLS: master_step: insert"
on public.master_step
for insert
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_step: update"
on public.master_step;

create policy "RLS: master_step: update"
on public.master_step
for update
using (
    public.fn_is_high_level_admin()
)
with check (
   public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_step: delete"
on public.master_step;

create policy "RLS: master_step: delete"
on public.master_step
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

-- master table

drop trigger if exists trg_set_updated_at
on public.master_lembaga;

create trigger trg_set_updated_at
before update on public.master_lembaga
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_kelas;

create trigger trg_set_updated_at
before update on public.master_kelas
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_step;

create trigger trg_set_updated_at
before update on public.master_step
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_tahun_ajaran;

create trigger trg_set_updated_at
before update on public.master_tahun_ajaran
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_roles;

create trigger trg_set_updated_at
before update on public.master_roles
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_categories;

create trigger trg_set_updated_at
before update on public.master_categories
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_tipe_dokumen;

create trigger trg_set_updated_at
before update on public.master_tipe_dokumen
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_tinggal_bersama;

create trigger trg_set_updated_at
before update on public.master_tinggal_bersama
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.master_status_rumah;

create trigger trg_set_updated_at
before update on public.master_status_rumah
for each row
execute function public.fn_set_updated_at();

alter table public.master_categories enable row level security;

alter table public.master_kelas enable row level security;

alter table public.master_lembaga enable row level security;

alter table public.master_step enable row level security;

alter table public.master_tahun_ajaran enable row level security;

alter table public.master_status_rumah enable row level security;

alter table public.master_tipe_dokumen enable row level security;

alter table public.master_tinggal_bersama enable row level security;