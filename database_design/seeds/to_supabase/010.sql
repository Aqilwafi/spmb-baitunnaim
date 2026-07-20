create table if not exists public.activity_logs (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid, -- tanpa foreign key
    event       text not null, -- contoh: 'user_login', 'export_report'
    status      text,          -- contoh: 'success', 'failed'
    metadata    jsonb,
    created_at  timestamptz not null default now()
);

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

create or replace function public.activity_logger(
    p_event text,
    p_status text default 'success',
    p_metadata JSONB default '{}'::jsonb,
    p_user_id UUID default null
)
language plpgsql
security definer
set search_path = public, pg_catalog, auth
returns void as $$
begin
    insert into public.activity_logs (
        user_id,
        event,
        status,
        metadata
    )
    values (
        coalesce(p_user_id, auth.uid()),
        p_event,
        p_status,
        p_metadata
    );
end;
$$