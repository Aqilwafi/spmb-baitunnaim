-- /database/rls/master/master_domain.sql

CREATE POLICY "domains_read_only_authenticated"
ON master_domains
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "no_insert_master_domains"
ON master_domains
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_domains"
ON master_domains
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_domains"
ON master_domains
FOR DELETE
USING (false);