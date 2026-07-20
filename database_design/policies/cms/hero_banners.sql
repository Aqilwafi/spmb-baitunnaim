-- policies/cms/hero_banners.sql

drop policy if exists "RLS: hero_banners: select"
on public.hero_banners;

create policy "RLS: hero_banners: select"
on public.hero_banners
for select
using (true);

drop policy if exists "RLS: hero_banners: insert"
on public.hero_banners;

create policy "RLS: hero_banners: insert"
on public.hero_banners
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: hero_banners: update"
on public.hero_banners;

create policy "RLS: hero_banners: update"
on public.hero_banners
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: hero_banners: delete"
on public.hero_banners;

create policy "RLS: hero_banners: delete"
on public.hero_banners
for delete
using (false); -- tidak boleh delete hero_banners, harus delete user di auth.users sekalian 2 fungsi.

