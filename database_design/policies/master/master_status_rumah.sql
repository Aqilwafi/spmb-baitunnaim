-- policies/master/rls_master_status_rumah.sql

alter table public.master_status_rumah enable row level security;

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

