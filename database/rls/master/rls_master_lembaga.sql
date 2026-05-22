-- /database/rls/master/master_lembaga.sql

CREATE POLICY "public_read_master_lembaga"
ON master_lembaga
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_lembaga"
ON master_lembaga
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_lembaga"
ON master_lembaga
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_lembaga"
ON master_lembaga
FOR DELETE
USING (false);