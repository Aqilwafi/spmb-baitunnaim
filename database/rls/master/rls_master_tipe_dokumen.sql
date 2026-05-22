-- /database/rls/master/master_step.sql

CREATE POLICY "public_read_master_tipe_dokumen"
ON master_tipe_dokumen
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tipe_dokumen"
ON master_tipe_dokumen
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tipe_dokumen"
ON master_tipe_dokumen
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tipe_dokumen"
ON master_tipe_dokumen
FOR DELETE
USING (false);
