-- policies/spmb/rls_pendidikan_siswa_sebelumnya.sql

alter table public.pendidikan_siswa_sebelumnya enable row level security;

drop policy if exists "RLS: pendidikan_siswa_sebelumnya: select"
on public.pendidikan_siswa_sebelumnya;

create policy "RLS: pendidikan_siswa_sebelumnya: select"
on public.pendidikan_siswa_sebelumnya
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: pendidikan_siswa_sebelumnya: insert"
on public.pendidikan_siswa_sebelumnya;

create policy "RLS: pendidikan_siswa_sebelumnya: insert"
on public.pendidikan_siswa_sebelumnya
for insert
with check (
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: pendidikan_siswa_sebelumnya: update"
on public.pendidikan_siswa_sebelumnya;

create policy "RLS: pendidikan_siswa_sebelumnya: update"
on public.pendidikan_siswa_sebelumnya
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

drop policy if exists "RLS: pendidikan_siswa_sebelumnya: delete"
on public.pendidikan_siswa_sebelumnya;

create policy "RLS: pendidikan_siswa_sebelumnya: delete"
on public.pendidikan_siswa_sebelumnya
for delete
using (false); -- tidak boleh delete pendidikan_siswa_sebelumnya, harus delete user di auth.users sekalian 2 fungsi.

