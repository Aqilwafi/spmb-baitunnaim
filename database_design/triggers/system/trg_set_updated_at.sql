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

-- users table

drop trigger if exists trg_set_updated_at
on public.profiles;

create trigger trg_set_updated_at
before update on public.profiles
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.user_roles;

create trigger trg_set_updated_at
before update on public.user_roles
for each row
execute function public.fn_set_updated_at();

-- spmb table

