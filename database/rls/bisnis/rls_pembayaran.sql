

CREATE POLICY "biz_select_pembayaran"
ON pembayaran
FOR SELECT
USING (
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_insert_pembayaran"
ON pembayaran
FOR INSERT
WITH CHECK (
  public.is_owner_form(form_pendaftaran_id)
);

CREATE POLICY "biz_update_pembayaran"
ON pembayaran
FOR UPDATE
USING (
  public.is_owner_form(form_pendaftaran_id)
  OR
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
)
WITH CHECK (
  public.is_owner_form(form_pendaftaran_id)
  OR
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_delete_pembayaran"
ON pembayaran
FOR DELETE
USING (
  public.is_owner_form(form_pendaftaran_id)
  OR
  public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);