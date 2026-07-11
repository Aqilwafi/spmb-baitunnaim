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

-- policies/spmb/rls_form_pendaftaran.sql

alter table public.form_pendaftaran enable row level security;

drop policy if exists "RLS: form_pendaftaran: select"
on public.form_pendaftaran;

create policy "RLS: form_pendaftaran: select"
on public.form_pendaftaran
for select
using (
    public.fn_can_manage_spmb()
    or
    pendaftar_id = auth.uid()
);

drop policy if exists "RLS: form_pendaftaran: insert"
on public.form_pendaftaran;

create policy "RLS: form_pendaftaran: insert"
on public.form_pendaftaran
for insert
with check (
    public.fn_is_owner_siswa_data(biodata_siswa_id)
    and
    pendaftar_id = auth.uid()
);

drop policy if exists "RLS: form_pendaftaran: update"
on public.form_pendaftaran;

create policy "RLS: form_pendaftaran: update"
on public.form_pendaftaran
for update  
using (
    public.fn_can_manage_spmb()
    or
    pendaftar_id = auth.uid()
)
with check (
    public.fn_can_manage_spmb()
    or
    pendaftar_id = auth.uid()
);

drop policy if exists "RLS: form_pendaftaran: delete"
on public.form_pendaftaran;

create policy "RLS: form_pendaftaran: delete"
on public.form_pendaftaran
for delete
using (false); -- tidak boleh delete form_pendaftaran, harus delete user di auth.users sekalian 2 fungsi.

-- policies/spmb/rls_pembayaran.sql

alter table public.pembayaran enable row level security;

drop policy if exists "RLS: pembayaran: select"
on public.pembayaran;

create policy "RLS: pembayaran: select"
on public.pembayaran
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(id)
);

drop policy if exists "RLS: pembayaran: insert"
on public.pembayaran;

create policy "RLS: pembayaran: insert"
on public.pembayaran
for insert
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(id)
);

drop policy if exists "RLS: pembayaran: update"
on public.pembayaran;

create policy "RLS: pembayaran: update"
on public.pembayaran
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(id)
);

drop policy if exists "RLS: pembayaran: delete"
on public.pembayaran;

create policy "RLS: pembayaran: delete"
on public.pembayaran
for delete
using (false); -- tidak boleh delete pembayaran, harus delete user di auth.users sekalian 2 fungsi.

-- policies/spmb/rls_dokumen.sql

alter table public.dokumen enable row level security;

drop policy if exists "RLS: dokumen: select"
on public.dokumen;

create policy "RLS: dokumen: select"
on public.dokumen
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(form_pendaftaran_id)
);

drop policy if exists "RLS: dokumen: insert"
on public.dokumen;

create policy "RLS: dokumen: insert"
on public.dokumen
for insert
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(form_pendaftaran_id)
);

drop policy if exists "RLS: dokumen: update"
on public.dokumen;

create policy "RLS: dokumen: update"
on public.dokumen
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(form_pendaftaran_id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_form_data(form_pendaftaran_id)
);

drop policy if exists "RLS: dokumen: delete"
on public.dokumen;

create policy "RLS: dokumen: delete"
on public.dokumen
for delete
using (false); -- tidak boleh delete dokumen, harus delete user di auth.users sekalian 2 fungsi.