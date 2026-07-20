-- policies/cms/pages.sql

drop policy if exists "RLS: pages: select"
on public.pages;

create policy "RLS: pages: select"
on public.pages
for select
using (true);

drop policy if exists "RLS: pages: insert"
on public.pages;

create policy "RLS: pages: insert"
on public.pages
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: pages: update"
on public.pages;

create policy "RLS: pages: update"
on public.pages
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: pages: delete"
on public.pages;

create policy "RLS: pages: delete"
on public.pages
for delete
using (false); -- tidak boleh delete pages, harus delete user di auth.users sekalian 2 fungsi.

