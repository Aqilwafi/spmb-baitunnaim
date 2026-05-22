-- /rls/authority/rls_user_roles.sql

CREATE POLICY "select_own_user_roles"
ON user_roles
FOR SELECT
USING (
  user_id = auth.uid() OR
  is_admin_level()
);

CREATE POLICY "no_insert_user_roles"
ON user_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_user_roles"
ON user_roles
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_user_roles"
ON user_roles
FOR DELETE
USING (false);