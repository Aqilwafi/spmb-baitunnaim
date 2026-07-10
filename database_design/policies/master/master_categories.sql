-- policies/master/rls_master_categories.sql

alter table public.master_categories enable row level security;

drop policy if exists "RLS: master_categories: select"
on public.master_categories;

create policy "RLS: master_categories: select"
on public.master_categories
for select
using (
    is_active = true
);

drop policy if exists "RLS: master_categories: insert"
on public.master_categories;

create policy "RLS: master_categories: insert"
on public.master_categories
for insert
to authenticated
with check (
    public.fn_is_high_level_admin()
);

drop policy if exists "RLS: master_categories: update"
on public.master_categories;

create policy "RLS: master_categories: update"
on public.master_categories
for update
to authenticated
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

