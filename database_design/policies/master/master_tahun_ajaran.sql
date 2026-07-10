-- policies/master/rls_master_tahun_ajaran.sql

alter table public.master_tahun_ajaran enable row level security;

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

