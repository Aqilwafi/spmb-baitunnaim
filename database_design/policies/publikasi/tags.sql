-- policies/publikasi/rls_tags.sql

drop policy if exists "RLS: tags: select"
on public.tags;

create policy "RLS: tags: select"
on public.tags
for select
using (true);

drop policy if exists "RLS: tags: insert"
on public.tags;

create policy "RLS: tags: insert"
on public.tags
for insert
with check (false);

drop policy if exists "RLS: tags: update"
on public.tags;

create policy "RLS: tags: update"
on public.tags
for update  
using (
    public.is_high_level_admin()
    or
    id = auth.uid()
)
with check (
    public.is_high_level_admin()
    or
    id = auth.uid()
);

drop policy if exists "RLS: tags: delete"
on public.tags;

create policy "RLS: tags: delete"
on public.tags
for delete
using (false); -- tidak boleh delete tag, harus delete user di auth.users sekalian 2 fungsi.

