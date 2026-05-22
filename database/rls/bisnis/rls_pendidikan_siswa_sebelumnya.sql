CREATE POLICY "biz_select_pendidikan_siswa_sebelumnya"
ON public.pendidikan_siswa_sebelumnya
FOR SELECT
TO authenticated
USING (
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_insert_pendidikan_siswa_sebelumnya"
ON pendidikan_siswa_sebelumnya
FOR INSERT
TO authenticated
WITH CHECK (
    public.is_owner_siswa(siswa_id)
);

CREATE POLICY "biz_update_pendidikan"
ON public.pendidikan_siswa_sebelumnya
FOR UPDATE
TO authenticated
USING (
    public.is_owner_siswa(siswa_id) 
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
)
WITH CHECK (
    siswa_id = pendidikan_siswa_sebelumnya.siswa_id
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_delete_pendidikan_siswa_sebelumnya"
ON pendidikan_siswa_sebelumnya
FOR DELETE
TO authenticated
USING (
    public.is_owner_siswa(siswa_id)
    OR 
    public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);