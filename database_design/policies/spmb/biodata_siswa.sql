-- policies/spmb/rls_biodata_siswa.sql

drop policy if exists "RLS: biodata_siswa: select"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: select"
on public.biodata_siswa
for select
using (
    public.fn_can_manage_spmb()
    or
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: insert"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: insert"
on public.biodata_siswa
for insert
with check (
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: update"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: update"
on public.biodata_siswa
for update  
using (
    public.is_high_level_admin()
    or
    owner_user_id = auth.uid()
)
with check (
    public.is_high_level_admin()
    or
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: delete"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: delete"
on public.biodata_siswa
for delete
using (false); -- tidak boleh delete biodata_siswa, harus delete user di auth.users sekalian 2 fungsi.

