

CREATE POLICY "biz_select_keluarga"
ON biodata_keluarga
FOR SELECT
TO authenticated
USING (
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_insert_keluarga"
ON biodata_keluarga
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_owner_siswa(siswa_id)
);

CREATE POLICY "biz_update_keluarga"
ON biodata_keluarga
FOR UPDATE
TO authenticated
USING (
  public.is_owner_siswa(siswa_id)
  OR
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
)
WITH CHECK (
  public.is_owner_siswa(siswa_id)
  OR 
  public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_delete_keluarga"
ON biodata_keluarga
FOR DELETE
TO authenticated
USING (
  public.is_owner_siswa(siswa_id)
  OR 
  public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);