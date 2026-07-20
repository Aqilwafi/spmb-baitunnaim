-- policies/publikasi/rls_posts.sql

alter table public.posts enable row level security;

drop policy if exists "RLS: posts: select"
on public.posts;

create policy "RLS: posts: select"
on public.posts
for select
using (true);

drop policy if exists "RLS: posts: insert"
on public.posts;

create policy "RLS: posts: insert"
on public.posts
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: posts: update"
on public.posts;

create policy "RLS: posts: update"
on public.posts
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: posts: delete"
on public.posts;

create policy "RLS: posts: delete"
on public.posts
for delete
using (false); -- tidak boleh delete post, harus delete user di auth.users sekalian 2 fungsi.

