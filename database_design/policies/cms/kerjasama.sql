-- policies/cms/kerjasama.sql

drop policy if exists "RLS: kerjasama: select"
on public.kerjasama;

create policy "RLS: kerjasama: select"
on public.kerjasama
for select
using (true);

drop policy if exists "RLS: kerjasama: insert"
on public.kerjasama;

create policy "RLS: kerjasama: insert"
on public.kerjasama
for insert
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: kerjasama: update"
on public.kerjasama;

create policy "RLS: kerjasama: update"
on public.kerjasama
for update  
using (
    public.can_manage_publication()
)
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: kerjasama: delete"
on public.kerjasama;

create policy "RLS: kerjasama: delete"
on public.kerjasama
for delete
using (false); -- tidak boleh delete kerjasama, harus delete user di auth.users sekalian 2 fungsi.

