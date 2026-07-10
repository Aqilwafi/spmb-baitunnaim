-- policies/master/rls_master_step.sql

alter table public.master_step enable row level security;

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

