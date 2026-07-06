-- /rls/system/rls_activity_logs.sql

CREATE POLICY "select_own_activity_logs"
ON activity_logs
FOR SELECT
USING (
  is_admin_level()
);

CREATE POLICY "no_insert_activity_logs"
ON activity_logs
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_activity_logs"
ON activity_logs
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_activity_logs"
ON activity_logs
FOR DELETE
USING (false);