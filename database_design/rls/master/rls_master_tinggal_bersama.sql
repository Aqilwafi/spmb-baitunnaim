-- /database/rls/master/master_tinggal_bersama.sql

CREATE POLICY "public_read_master_tinggal_bersama"
ON master_tinggal_bersama
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tinggal_bersama"
ON master_tinggal_bersama
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tinggal_bersama"
ON master_tinggal_bersama
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tinggal_bersama"
ON master_tinggal_bersama
FOR DELETE
USING (false);
