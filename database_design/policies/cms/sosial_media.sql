-- policies/cms/sosial_media.sql

drop policy if exists "RLS: sosial_media: select"
on public.sosial_media;

create policy "RLS: sosial_media: select"
on public.sosial_media
for select
using (true);

drop policy if exists "RLS: sosial_media: insert"
on public.sosial_media;

create policy "RLS: sosial_media: insert"
on public.sosial_media
for insert
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: sosial_media: update"
on public.sosial_media;

create policy "RLS: sosial_media: update"
on public.sosial_media
for update  
using (
    public.can_manage_publication()
)
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: sosial_media: delete"
on public.sosial_media;

create policy "RLS: sosial_media: delete"
on public.sosial_media
for delete
using (false); -- tidak boleh delete sosial_media, harus delete user di auth.users sekalian 2 fungsi.

