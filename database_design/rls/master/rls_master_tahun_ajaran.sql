-- /database/rls/master/master_tahun_ajaran.sql

CREATE POLICY "public_read_master_tahun_ajaran"
ON master_tahun_ajaran
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tahun_ajaran"
ON master_tahun_ajaran
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tahun_ajaran"
ON master_tahun_ajaran
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tahun_ajaran"
ON master_tahun_ajaran
FOR DELETE
USING (false);