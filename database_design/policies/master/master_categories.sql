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

