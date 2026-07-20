-- policies/publikasi/rls_tags.

alter table public.tags enable row level security;

drop policy if exists "RLS: tags: select"
on public.tags;

create policy "RLS: tags: select"
on public.tags
for select
using (true);

drop policy if exists "RLS: tags: insert"
on public.tags;

create policy "RLS: tags: insert"
on public.tags
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: tags: update"
on public.tags;

create policy "RLS: tags: update"
on public.tags
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: tags: delete"
on public.tags;

create policy "RLS: tags: delete"
on public.tags
for delete
using (false); -- tidak boleh delete tag, harus delete user di auth.users sekalian 2 fungsi.

