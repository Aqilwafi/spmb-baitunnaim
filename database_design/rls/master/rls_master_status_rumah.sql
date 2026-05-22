-- /database/rls/master/master_status_rumah.sql

CREATE POLICY "public_read_master_status_rumah"
ON master_status_rumah
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_status_rumah"
ON master_status_rumah
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_status_rumah"
ON master_status_rumah
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_status_rumah"
ON master_status_rumah
FOR DELETE
USING (false);