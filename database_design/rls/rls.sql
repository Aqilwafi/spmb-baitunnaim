-- /rls/authority/rls_profiles.sql

CREATE POLICY "select_profile"
ON profiles
FOR SELECT
USING (
  id = auth.uid() OR is_admin_level()
);

CREATE POLICY "no_insert_profiles"
ON profiles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "update_own_profile"
ON profiles
FOR UPDATE
USING (
  id = auth.uid()
)
WITH CHECK (
  id = auth.uid()
);

CREATE POLICY "no_delete_profiles"
ON profiles
FOR DELETE
USING (false);

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
USING (false)
WITH CHECK (false);

CREATE POLICY "no_delete_user_roles"
ON user_roles
FOR DELETE
USING (false);