-- policies/cms/site_settings.sql

drop policy if exists "RLS: site_settings: select"
on public.site_settings;

create policy "RLS: site_settings: select"
on public.site_settings
for select
using (true);

drop policy if exists "RLS: site_settings: insert"
on public.site_settings;

create policy "RLS: site_settings: insert"
on public.site_settings
for insert
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: site_settings: update"
on public.site_settings;

create policy "RLS: site_settings: update"
on public.site_settings
for update  
using (
    public.can_manage_publication()
)
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: site_settings: delete"
on public.site_settings;

create policy "RLS: site_settings: delete"
on public.site_settings
for delete
using (false); -- tidak boleh delete kerjasama, harus delete user di auth.users sekalian 2 fungsi.

