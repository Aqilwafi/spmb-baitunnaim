-- policies/audit/activity_logs.sql

drop policy if exists "RLS: activity_logs: select"
on public.activity_logs;

create policy "RLS: activity_logs: select"
on public.activity_logs
for select
using (
    public.is_high_level_admin()
);

drop policy if exists "RLS: activity_logs: insert"
on public.activity_logs;

create policy "RLS: activity_logs: insert"
on public.activity_logs
for insert
with check (false);

drop policy if exists "RLS: activity_logs: update"
on public.activity_logs;

create policy "RLS: activity_logs: update"
on public.activity_logs
for update  
using (false);

drop policy if exists "RLS: activity_logs: delete"
on public.activity_logs;

create policy "RLS: activity_logs: delete"
on public.activity_logs
for delete
using (false); -- tidak boleh delete activity_logs, harus delete user di auth.users sekalian 2 fungsi.

