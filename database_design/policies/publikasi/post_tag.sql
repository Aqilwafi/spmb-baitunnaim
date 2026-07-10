-- policies/publikasi/rls_post_tag.sql

drop policy if exists "RLS: post_tag: select"
on public.post_tag;

create policy "RLS: post_tag: select"
on public.post_tag
for select
using (true);

drop policy if exists "RLS: post_tag: insert"
on public.post_tag;

create policy "RLS: post_tag: insert"
on public.post_tag
for insert
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: post_tag: update"
on public.post_tag;

create policy "RLS: post_tag: update"
on public.post_tag
for update  
using (
    public.can_manage_publication()
)
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: post_tag: delete"
on public.post_tag;

create policy "RLS: post_tag: delete"
on public.post_tag
for delete
using (false); -- tidak boleh delete post_tag, harus delete user di auth.users sekalian 2 fungsi.

