-- policies/spmb/rls_pembayaran.sql

drop policy if exists "RLS: pembayaran: select"
on public.pembayaran;

create policy "RLS: pembayaran: select"
on public.pembayaran
for select
using (true);

drop policy if exists "RLS: pembayaran: insert"
on public.pembayaran;

create policy "RLS: pembayaran: insert"
on public.pembayaran
for insert
with check (false);

drop policy if exists "RLS: pembayaran: update"
on public.pembayaran;

create policy "RLS: pembayaran: update"
on public.pembayaran
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

drop policy if exists "RLS: pembayaran: delete"
on public.pembayaran;

create policy "RLS: pembayaran: delete"
on public.pembayaran
for delete
using (false); -- tidak boleh delete pembayaran, harus delete user di auth.users sekalian 2 fungsi.

