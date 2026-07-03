

CREATE POLICY "biz_select_dokumen"
ON dokumen
FOR SELECT
USING (
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_insert_dokumen"
ON dokumen
FOR INSERT
WITH CHECK (
  public.is_owner_form(form_pendaftaran_id)
);

CREATE POLICY "biz_update_dokumen"
ON dokumen
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

CREATE POLICY "biz_delete_dokumen"
ON dokumen
FOR DELETE
USING (
  public.is_owner_form(form_pendaftaran_id)
  OR
  public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);