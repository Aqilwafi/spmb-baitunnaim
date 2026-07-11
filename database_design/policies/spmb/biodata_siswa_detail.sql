-- policies/spmb/rls_biodata_siswa_detail.sql

alter table public.biodata_siswa_detail enable row level security;

drop policy if exists "RLS: biodata_siswa_detail: select"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: select"
on public.biodata_siswa_detail
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: insert"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: insert"
on public.biodata_siswa_detail
for insert
with check (
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: update"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: update"
on public.biodata_siswa_detail
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: delete"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: delete"
on public.biodata_siswa_detail
for delete
using (false); -- tidak boleh delete biodata_siswa_detail, harus delete user di auth.users sekalian 2 fungsi.

