-- policies/publikasi/post_images.sql

alter table public.post_images enable row level security;

drop policy if exists "RLS: post_images: select"
on public.post_images;

create policy "RLS: post_images: select"
on public.post_images
for select
using (true);

drop policy if exists "RLS: post_images: insert"
on public.post_images;

create policy "RLS: post_images: insert"
on public.post_images
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_images: update"
on public.post_images;

create policy "RLS: post_images: update"
on public.post_images
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_images: delete"
on public.post_images;

create policy "RLS: post_images: delete"
on public.post_images
for delete
using (false); -- tidak boleh delete post_tag, harus delete user di auth.users sekalian 2 fungsi.

