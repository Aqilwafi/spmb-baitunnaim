-- Buat View-nya terlebih dahulu
CREATE OR REPLACE VIEW public.v_form_pendaftaran AS
SELECT 
    f.id,
    f.siswa_id,
    s.nama_lengkap AS nama_siswa,
    s.akun_pendaftar_id,
    st.label AS last_step,
    l.label AS lembaga,
    k.label AS kelas,
    f.status_keputusan_final_pendaftaran,
    f.updated_at AS last_modified

FROM public.form_pendaftaran f
JOIN public.biodata_siswa s 
    ON s.id = f.siswa_id

JOIN public.master_step st 
    ON st.id = f.master_step_id

JOIN public.master_lembaga l 
    ON l.code = f.master_lembaga_code

JOIN public.master_kelas k 
    ON k.code = f.master_kelas_code;

-- Pasang Policy SELECT super hemat CPU di sini!
CREATE POLICY "view_select_form_pendaftaran"
ON public.v_form_pendaftaran
FOR SELECT
TO authenticated
USING (
    akun_pendaftar_id = auth.uid()
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE OR REPLACE VIEW public.v_form_pendaftaran_active AS
SELECT 
    f.id,
    f.siswa_id,
    s.nama_lengkap AS nama_siswa,
    s.akun_pendaftar_id,
    st.label AS last_step,
    l.label AS lembaga,
    k.label AS kelas,
    f.status_keputusan_final_pendaftaran,
    f.updated_at AS last_modified

FROM public.form_pendaftaran f
JOIN public.biodata_siswa s 
    ON s.id = f.siswa_id

JOIN public.master_step st 
    ON st.id = f.master_step_id

JOIN public.master_lembaga l 
    ON l.code = f.master_lembaga_code

JOIN public.master_kelas k 
    ON k.code = f.master_kelas_code

JOIN public.master_tahun_ajaran ta
    ON ta.code = f.tahun_ajaran_code
    AND ta.is_active = true;

CREATE POLICY "view_select_form_pendaftaran_active"
ON public.v_form_pendaftaran_active
FOR SELECT
TO authenticated
USING (
    akun_pendaftar_id = auth.uid()
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);