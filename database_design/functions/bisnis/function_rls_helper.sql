-- /functions/bisnis/function_rls_helers.sql

CREATE OR REPLACE FUNCTION public.is_owner_siswa(p_siswa_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM biodata_siswa s
    WHERE s.id = p_siswa_id
      AND s.akun_pendaftar_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_owner_form(p_form_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM form_pendaftaran f
    JOIN biodata_siswa s ON s.id = f.siswa_id
    WHERE f.id = p_form_id
      AND s.akun_pendaftar_id = auth.uid()
  );
$$;