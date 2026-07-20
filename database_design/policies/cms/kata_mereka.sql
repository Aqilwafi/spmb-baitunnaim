-- policies/cms/kata_mereka.sql

drop policy if exists "RLS: kata_mereka: select"
on public.kata_mereka;

create policy "RLS: kata_mereka: select"
on public.kata_mereka
for select
using (true);

drop policy if exists "RLS: kata_mereka: insert"
on public.kata_mereka;

create policy "RLS: kata_mereka: insert"
on public.kata_mereka
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: kata_mereka: update"
on public.kata_mereka;

create policy "RLS: kata_mereka: update"
on public.kata_mereka
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: kata_mereka: delete"
on public.kata_mereka;

create policy "RLS: kata_mereka: delete"
on public.kata_mereka
for delete
using (false); -- tidak boleh delete kata_mereka, harus delete user di auth.users sekalian 2 fungsi.

