

CREATE POLICY "biz_select_form"
ON form_pendaftaran
FOR SELECT
TO authenticated
USING (
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_insert_form"
ON form_pendaftaran
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_owner_siswa(siswa_id)
);

CREATE POLICY "biz_update_form"
ON form_pendaftaran
FOR UPDATE
TO authenticated
USING (
  public.is_owner_form(id)
  OR
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
)
WITH CHECK (
  public.is_owner_form(id)
  OR
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_delete_form"
ON form_pendaftaran
FOR DELETE
TO authenticated
USING (
  public.is_owner_form(id)
  OR
  public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);