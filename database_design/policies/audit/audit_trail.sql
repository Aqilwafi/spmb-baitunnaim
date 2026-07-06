-- /rls/system/rls_audit_trail.sql

CREATE POLICY "select_own_audit_trail"
ON audit_trail
FOR SELECT
USING (
  is_admin_level()
);

CREATE POLICY "no_insert_audit_trail"
ON audit_trail
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_audit_trail"
ON audit_trail
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_audit_trail"
ON audit_trail
FOR DELETE
USING (false);