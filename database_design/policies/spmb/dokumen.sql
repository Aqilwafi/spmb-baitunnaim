-- policies/spmb/rls_dokumen.sql

drop policy if exists "RLS: dokumen: select"
on public.dokumen;

create policy "RLS: dokumen: select"
on public.dokumen
for select
using (true);

drop policy if exists "RLS: dokumen: insert"
on public.dokumen;

create policy "RLS: dokumen: insert"
on public.dokumen
for insert
with check (false);

drop policy if exists "RLS: dokumen: update"
on public.dokumen;

create policy "RLS: dokumen: update"
on public.dokumen
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

drop policy if exists "RLS: dokumen: delete"
on public.dokumen;

create policy "RLS: dokumen: delete"
on public.dokumen
for delete
using (false); -- tidak boleh delete dokumen, harus delete user di auth.users sekalian 2 fungsi.

