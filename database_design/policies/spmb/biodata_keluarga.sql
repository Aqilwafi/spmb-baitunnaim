-- policies/spmb/rls_biodata_keluarga.sql

alter table public.biodata_keluarga enable row level security;

drop policy if exists "RLS: biodata_keluarga: select"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: select"
on public.biodata_keluarga
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: insert"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: insert"
on public.biodata_keluarga
for insert
with check (
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: update"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: update"
on public.biodata_keluarga
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: delete"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: delete"
on public.biodata_keluarga
for delete
using (false); -- tidak boleh delete biodata_keluarga, harus delete user di auth.users sekalian 2 fungsi.

