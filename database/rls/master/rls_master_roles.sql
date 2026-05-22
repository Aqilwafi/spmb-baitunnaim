-- /database/rls/master/master_roles.sql

CREATE POLICY "roles_read_only_authenticated"
ON master_roles
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "no_insert_master_roles"
ON master_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_roles"
ON master_roles
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_roles"
ON master_roles
FOR DELETE
USING (false);
