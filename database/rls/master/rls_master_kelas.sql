-- /database/rls/master/master_kelas.sql

CREATE POLICY "public_read_master_kelas"
ON master_kelas
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_kelas"
ON master_kelas
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_kelas"
ON master_kelas
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_kelas"
ON master_kelas
FOR DELETE
USING (false);