-- /database/rls/master/master_step.sql

ALTER TABLE master_step ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_master_step"
ON master_step
FOR SELECT
USING (true);

CREATE POLICY "no_update_master_step"
ON master_step
FOR UPDATE
USING (false);

CREATE POLICY "no_insert_master_step"
ON master_step
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_delete_master_step"
ON master_step
FOR DELETE
USING (false);