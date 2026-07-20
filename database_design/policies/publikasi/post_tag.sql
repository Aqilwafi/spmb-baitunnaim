-- policies/publikasi/rls_post_tag.sql

alter table public.post_tag enable row level security;

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
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_tag: update"
on public.post_tag;

create policy "RLS: post_tag: update"
on public.post_tag
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_tag: delete"
on public.post_tag;

create policy "RLS: post_tag: delete"
on public.post_tag
for delete
using (false); -- tidak boleh delete post_tag, harus delete user di auth.users sekalian 2 fungsi.

