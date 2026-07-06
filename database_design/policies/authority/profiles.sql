-- policies/authority/rls_profiles.sql

drop policy if exists "RLS: profiles: select"
on public.profiles;

create policy "RLS: profiles: select"
on public.profiles
for select
using (
    public.is_high_level_admin()
    or
    id = auth.uid()
);

drop policy if exists "RLS: profiles: insert"
on public.profiles;

create policy "RLS: profiles: insert"
on public.profiles
for insert
with check (false);

drop policy if exists "RLS: profiles: update"
on public.profiles;

create policy "RLS: profiles: update"
on public.profiles
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

drop policy if exists "RLS: profiles: delete"
on public.profiles;

create policy "RLS: profiles: delete"
on public.profiles
for delete
using (false); -- tidak boleh delete profile, harus delete user di auth.users sekalian 2 fungsi.

