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

