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

