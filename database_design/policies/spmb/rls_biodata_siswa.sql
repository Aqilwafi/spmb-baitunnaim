CREATE POLICY "biz_select_biodata_siswa"
ON public.biodata_siswa
FOR SELECT
TO authenticated
USING (
    akun_pendaftar_id = auth.uid() 
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[]) 
);

CREATE POLICY "biz_insert_biodata_siswa"
ON public.biodata_siswa
FOR INSERT
TO authenticated
WITH CHECK (
    akun_pendaftar_id = auth.uid()
);

CREATE POLICY "biz_update_biodata_siswa"
ON public.biodata_siswa
FOR UPDATE
TO authenticated
USING (
    akun_pendaftar_id = auth.uid()
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
)
WITH CHECK (
    akun_pendaftar_id = auth.uid()
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE POLICY "biz_delete_biodata_siswa"
ON public.biodata_siswa
FOR DELETE
TO authenticated
USING (
    akun_pendaftar_id = auth.uid()
    OR 
    public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[]) 
);