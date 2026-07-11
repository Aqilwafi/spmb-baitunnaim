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

