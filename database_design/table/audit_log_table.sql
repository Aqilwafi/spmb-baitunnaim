-- =========================================================
-- AUDIT TRAIL
-- =========================================================
CREATE TABLE IF NOT EXISTS audit_trail (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID, -- no FK, log tetap ada meski user dihapus
    table_name  TEXT NOT NULL,
    record_id   UUID,
    action      TEXT NOT NULL,
    old_data    JSONB,
    new_data    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_action
        CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    CONSTRAINT chk_data_presence
        CHECK (old_data IS NOT NULL OR new_data IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_audit_created_at
ON audit_trail(created_at DESC);


-- =========================================================
-- ACTIVITY LOGS
-- =========================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID, -- no FK, same reason
    event       TEXT NOT NULL,
    status      TEXT,
    metadata    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_created_at
ON activity_logs(created_at DESC);


-- =========================================================
-- CLEANUP FUNCTION
-- =========================================================
CREATE OR REPLACE FUNCTION cleanup_old_logs(retention_days INT DEFAULT 90)
RETURNS VOID AS $$
BEGIN
    DELETE FROM audit_trail
    WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;

    DELETE FROM activity_logs
    WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;