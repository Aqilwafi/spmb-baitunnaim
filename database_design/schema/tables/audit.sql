-- =========================================================
-- 1. tabel audit trail (perubahan data level database)
-- =========================================================
create table if not exists audit_trail (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid, -- tanpa foreign key, log tetap aman meski user dihapus
    table_name  text not null,
    record_id   text, -- menggunakan text agar fleksibel menampung bigint, smallint, atau uuid
    action      text not null,
    old_data    jsonb,
    new_data    jsonb,
    created_at  timestamptz not null default now(),
    constraint chk_action
        check (action in ('insert', 'update', 'delete')), -- disesuaikan ke lowercase
    constraint chk_data_presence
        check (old_data is not null or new_data is not null)
);

-- =========================================================
-- 2. tabel activity logs (aksi user level aplikasi)
-- =========================================================
create table if not exists activity_logs (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid, -- tanpa foreign key
    event       text not null, -- contoh: 'user_login', 'export_report'
    status      text,          -- contoh: 'success', 'failed'
    metadata    jsonb,
    created_at  timestamptz not null default now()
);

-- =========================================================
-- 3. fungsi pembersihan log otomatis (cleanup)
-- =========================================================
create or replace function cleanup_old_logs(retention_days int default 90)
returns void as $$
begin
    delete from audit_trail
    where created_at < now() - (retention_days || ' days')::interval;

    delete from activity_logs
    where created_at < now() - (retention_days || ' days')::interval;
end;
$$ language plpgsql;