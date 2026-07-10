-- policies/cms/faq.sql

drop policy if exists "RLS: faq: select"
on public.faq;

create policy "RLS: faq: select"
on public.faq
for select
using (true);

drop policy if exists "RLS: faq: insert"
on public.faq;

create policy "RLS: faq: insert"
on public.faq
for insert
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: faq: update"
on public.faq;

create policy "RLS: faq: update"
on public.faq
for update  
using (
    public.can_manage_publication()
)
with check (
    public.can_manage_publication()
);

drop policy if exists "RLS: faq: delete"
on public.faq;

create policy "RLS: faq: delete"
on public.faq
for delete
using (false); -- tidak boleh delete faq, harus delete user di auth.users sekalian 2 fungsi.

