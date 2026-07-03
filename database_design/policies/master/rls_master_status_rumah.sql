-- policies/master/rls_master_status_rumah.sql

drop policy if exists "RLS: master_status_rumah: select"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: select"
on public.master_status_rumah
for select
using (
    public.can_read_master_data(is_active)
);

drop policy if exists "RLS: master_status_rumah: insert"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: insert"
on public.master_status_rumah
for insert
with check (
    public.is_high_level_admin()
);

drop policy if exists "RLS: master_status_rumah: update"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: update"
on public.master_status_rumah
for update
with check (
   public.is_high_level_admin()
);

drop policy if exists "RLS: master_status_rumah: delete"
on public.master_status_rumah;

create policy "RLS: master_status_rumah: delete"
on public.master_status_rumah
for delete
with check (
   public.is_high_level_admin()
);

