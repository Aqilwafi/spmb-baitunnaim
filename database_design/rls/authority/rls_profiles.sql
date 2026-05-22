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