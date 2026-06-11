-- Buat View-nya terlebih dahulu
CREATE OR REPLACE VIEW public.v_pendidikan_siswa AS
SELECT 
    p.id, 
    p.siswa_id, 
    p.nama_sekolah, 
    p.tahun_lulus, 
    s.akun_pendaftar_id -- 🌟 Meng-inject kolom ID dari tabel induk
FROM public.pendidikan_siswa_sebelumnya p
JOIN public.biodata_siswa s ON s.id = p.siswa_id;

-- Aktifkan RLS pada View tersebut
ALTER VIEW public.v_pendidikan_siswa ALTER COLUMN akun_pendaftar_id SET NOT NULL;

-- Pasang Policy SELECT super hemat CPU di sini!
CREATE POLICY "view_select_pendidikan"
ON public.v_pendidikan_siswa
FOR SELECT
TO authenticated
USING (
    akun_pendaftar_id = auth.uid() -- ✨ 0% Query tambahan, langsung tancap gas!
    OR 
    public.has_any_role(ARRAY['VERIFIKATOR', 'ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);