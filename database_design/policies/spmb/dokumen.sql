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

