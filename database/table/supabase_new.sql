CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('L', 'P');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hubungan_enum') THEN
        CREATE TYPE hubungan_enum AS ENUM ('AYAH', 'IBU', 'WALI');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'semester_enum') THEN
        CREATE TYPE semester_enum AS ENUM ('GANJIL', 'GENAP');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_validasi_enum') THEN
        CREATE TYPE status_validasi_enum AS ENUM ('PENDING', 'APPROVED', 'REVISION_REQUIRED');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pendidikan_keluarga_enum') THEN
        CREATE TYPE pendidikan_keluarga_enum AS ENUM ('SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3', 'LAINNYA');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nik_type') THEN
        CREATE DOMAIN nik_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{16}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nisn_type') THEN
        CREATE DOMAIN nisn_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{10}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'npsn_type') THEN
        CREATE DOMAIN npsn_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{8}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kk_type') THEN
        CREATE DOMAIN kk_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{16}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'phone_number') THEN
        CREATE DOMAIN phone_number AS TEXT
        CHECK (VALUE ~ E'^\\+[1-9][0-9]{7,14}$' OR VALUE IS NULL);
    END IF;
END $$;

-- Step Bisnis (Alur Form)
CREATE TABLE IF NOT EXISTS master_step (
    id             SMALLINT PRIMARY KEY,
    code           TEXT UNIQUE NOT NULL,
    label          TEXT NOT NULL,
    sort_order     SMALLINT NOT NULL UNIQUE,
    is_revisable   BOOLEAN NOT NULL DEFAULT FALSE,
    is_active      BOOLEAN NOT NULL DEFAULT TRUE
);

-- Lembaga 
CREATE TABLE IF NOT EXISTS master_lembaga (
    id      SMALLINT PRIMARY KEY,
    code    VARCHAR(20) UNIQUE NOT NULL,
    label   VARCHAR(20) UNIQUE NOT NULL
);

-- Kelas
CREATE TABLE IF NOT EXISTS master_kelas (
    id   SMALLINT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    label VARCHAR(20) UNIQUE NOT NULL
);

-- Tahun Ajaran
CREATE TABLE IF NOT EXISTS master_tahun_ajaran (
    id            SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code          VARCHAR(10) UNIQUE NOT NULL,
    tahun_mulai   INT NOT NULL,
    tahun_selesai INT NOT NULL,
    semester      semester_enum NOT NULL,
    is_active     BOOLEAN DEFAULT FALSE,
    created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT    uniq_tahun_ajaran UNIQUE (tahun_mulai, tahun_selesai, semester),
    CONSTRAINT    check_tahun_valid CHECK (tahun_selesai = tahun_mulai + 1)
);

-- Dokumen Master
CREATE TABLE IF NOT EXISTS master_tipe_dokumen (
    id   SMALLINT PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

-- Status Rumah Master
CREATE TABLE IF NOT EXISTS master_status_rumah (
    id   SMALLINT PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

-- Tinggal Bersama  Master
CREATE TABLE IF NOT EXISTS master_tinggal_bersama (
    id   SMALLINT PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tahun_ajaran_active_unique 
ON master_tahun_ajaran (is_active) WHERE (is_active = TRUE);

-- /database/rls/master/master_step.sql

ALTER TABLE master_step ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_master_step"
ON master_step
FOR SELECT
USING (true);

CREATE POLICY "no_update_master_step"
ON master_step
FOR UPDATE
USING (false);

CREATE POLICY "no_insert_master_step"
ON master_step
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_delete_master_step"
ON master_step
FOR DELETE
USING (false);

-- /database/rls/master/master_lembaga.sql

CREATE POLICY "public_read_master_lembaga"
ON master_lembaga
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_lembaga"
ON master_lembaga
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_lembaga"
ON master_lembaga
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_lembaga"
ON master_lembaga
FOR DELETE
USING (false);

-- /database/rls/master/master_kelas.sql

CREATE POLICY "public_read_master_kelas"
ON master_kelas
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_kelas"
ON master_kelas
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_kelas"
ON master_kelas
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_kelas"
ON master_kelas
FOR DELETE
USING (false);

-- /database/rls/master/master_tahun_ajaran.sql

CREATE POLICY "public_read_master_tahun_ajaran"
ON master_tahun_ajaran
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tahun_ajaran"
ON master_tahun_ajaran
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tahun_ajaran"
ON master_tahun_ajaran
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tahun_ajaran"
ON master_tahun_ajaran
FOR DELETE
USING (false);

-- /database/rls/master/master_status_rumah.sql

CREATE POLICY "public_read_master_status_rumah"
ON master_status_rumah
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_status_rumah"
ON master_status_rumah
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_status_rumah"
ON master_status_rumah
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_status_rumah"
ON master_status_rumah
FOR DELETE
USING (false);

-- /database/rls/master/master_tinggal_bersama.sql

CREATE POLICY "public_read_master_tinggal_bersama"
ON master_tinggal_bersama
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tinggal_bersama"
ON master_tinggal_bersama
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tinggal_bersama"
ON master_tinggal_bersama
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tinggal_bersama"
ON master_tinggal_bersama
FOR DELETE
USING (false);

-- /database/rls/master/master_step.sql

CREATE POLICY "public_read_master_tipe_dokumen"
ON master_tipe_dokumen
FOR SELECT
USING (true);

CREATE POLICY "no_insert_master_tipe_dokumen"
ON master_tipe_dokumen
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_tipe_dokumen"
ON master_tipe_dokumen
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_tipe_dokumen"
ON master_tipe_dokumen
FOR DELETE
USING (false);

INSERT INTO master_step (
    id,
    code,
    label,
    sort_order,
    is_revisable
)
VALUES
    (1, 'FORM', 'Buat Form', 1, FALSE),
    (2, 'PAYMENT', 'Pembayaran', 2, TRUE),
    (3, 'BIODATA_STUDENT', 'Biodata Siswa', 3, TRUE),
    (4, 'BIODATA_FATHER', 'Biodata Ayah', 4, TRUE),
    (5, 'BIODATA_MOTHER', 'Biodata Ibu', 5, TRUE),
    (6, 'BIODATA_WALI', 'Biodata Wali', 6, TRUE),
    (7, 'DOCUMENT_KK', 'Dokumen KK', 7, TRUE),
    (8, 'DOCUMENT_KTP', 'Dokumen KTP', 8, TRUE),
    (9, 'DOCUMENT_AKTE', 'Dokumen AKTE', 9, TRUE),
    (10, 'FINALIZATION', 'Finalisasi', 10, FALSE)
ON CONFLICT (code)
DO UPDATE SET
    label = EXCLUDED.label,
    sort_order = EXCLUDED.sort_order,
    is_revisable = EXCLUDED.is_revisable;

INSERT INTO master_lembaga (id, code, label) VALUES 
(1, 'MI', 'MI'), 
(2, 'TK', 'TK'), 
(3, 'KB', 'KB'), 
(4, 'TPA', 'TPA')
ON CONFLICT (label) DO NOTHING;

INSERT INTO master_kelas (id, code, label) VALUES
    (1, 'MI01', 'Kelas 1'),
    (2, 'MI02', 'Kelas 2'),
    (3, 'MI03', 'Kelas 3'),
    (4, 'MI04', 'Kelas 4'),
    (5, 'MI05', 'Kelas 5'),
    (6, 'MI06', 'Kelas 6')
ON CONFLICT (label) DO NOTHING;

INSERT INTO master_tahun_ajaran (code,tahun_mulai, tahun_selesai, semester, is_active) VALUES
    ('2025-2', 2025, 2026, 'GENAP', FALSE),
    ('2026-1', 2026, 2027, 'GANJIL', TRUE),
    ('2026-2', 2026, 2027, 'GENAP', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

INSERT INTO master_tipe_dokumen (id, code, label) VALUES
    (1, 'KK_TYPE_DOC', 'Kartu Keluarga'), 
    (2, 'KTP_TYPE_DOC', 'Kartu Tanda Penduduk'), 
    (3, 'AKTE_TYPE_DOC', 'Akte Kelahiran')
ON CONFLICT (code) DO NOTHING;

INSERT INTO master_status_rumah (id, code, label) VALUES
    (1, 'NENEK', 'Nenek'), 
    (2, 'ORTU', 'Orang Tua'), 
    (3, 'SAUDARA', 'Saudara'), 
    (4, 'DINAS', 'Dinas'), 
    (5, 'SEWA', 'Sewa/Kontrak')
ON CONFLICT (code) DO NOTHING;

INSERT INTO master_tinggal_bersama (id, code, label) VALUES
    (1, 'ORTU', 'Orang Tua'), 
    (2, 'SAUDARA', 'Saudara'), 
    (3, 'WALI', 'Wali'), 
    (4, 'PANTI', 'Panti'), 
    (5, 'PESANTREN', 'Pesantren')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS master_roles (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    role_name TEXT NOT NULL,
    role_description TEXT
);

CREATE TABLE IF NOT EXISTS master_domains (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    domain_name TEXT NOT NULL,
    domain_description TEXT
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id SMALLINT NOT NULL REFERENCES master_roles(id) ON DELETE CASCADE,
    domain_id SMALLINT NOT NULL REFERENCES master_domains(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    suspended_at TIMESTAMPTZ,
    suspended_by UUID REFERENCES auth.users(id),
    PRIMARY KEY (user_id, role_id, domain_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_user_role_domain
ON user_roles(user_id, role_id, domain_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_user
ON user_roles(user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_role_domain
ON user_roles(role_id, domain_id);

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

-- /database/rls/master/master_roles.sql

CREATE POLICY "roles_read_only_authenticated"
ON master_roles
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "no_insert_master_roles"
ON master_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_master_roles"
ON master_roles
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_master_roles"
ON master_roles
FOR DELETE
USING (false);

-- 1. Mengecek apakah user memegang sebuah role tertentu (tanpa peduli domainnya)
CREATE OR REPLACE FUNCTION public.has_role(p_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = p_role
  );
$$;

-- 2. Mengecek apakah user memegang salah satu dari beberapa role yang dimasukkan (tanpa peduli domain)
CREATE OR REPLACE FUNCTION public.has_any_role(p_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = ANY(p_roles)
  );
$$;

-- 3. Shortcut untuk memastikan apakah user adalah seorang SUPERADMIN
CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = 'SUPERADMIN'
  );
$$;

-- 4. Mengecek apakah kasta user masuk ke kategori Administrator atau Superadmin (Dipakai di RLS kamu!)
CREATE OR REPLACE FUNCTION public.is_admin_level()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') IN ('ADMINISTRATOR', 'SUPERADMIN')
  );
$$;

-- 5. Mengecek kombinasi berpasangan antara role DAN domain (Kunci utama aplikasi kamu)
CREATE OR REPLACE FUNCTION public.has_role_in_domain(
  p_role TEXT,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = p_role
      AND (r ->> 'domain') = p_domain
  );
$$;

-- /rls/authority/rls_user_roles.sql

CREATE POLICY "select_own_user_roles"
ON user_roles
FOR SELECT
USING (
  user_id = auth.uid() OR
  is_admin_level()
);

CREATE POLICY "no_insert_user_roles"
ON user_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_user_roles"
ON user_roles
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_user_roles"
ON user_roles
FOR DELETE
USING (false);

INSERT INTO master_roles (id, code, role_name, role_description) VALUES
    (1, 'PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    (2, 'SUPERADMIN', 'Super Administrator', 'Full system access'),
    (3, 'ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    (4, 'VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    (5, 'PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO master_domains (id, code, domain_name, domain_description) VALUES
    (1, 'SPMB', 'Sistem Penerimaan Murid Baru', 'Domain pendaftaran & seleksi siswa'),
    (2, 'PUBLIKASI', 'Sistem Publikasi', 'Domain konten & informasi')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    legacy_user_id UUID, -- abaikan ini. Hanya untuk migrasi data lama, nanti akan dihapus
    username VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- /rls/authority/rls_profiles.sql

CREATE POLICY "select_profile"
ON profiles
FOR SELECT
USING (
  id = auth.uid() OR is_admin_level()
);

CREATE POLICY "no_insert_profiles"
ON profiles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "update_own_profile"
ON profiles
FOR UPDATE
USING (
  id = auth.uid()
)
WITH CHECK (
  id = auth.uid()
);

CREATE POLICY "no_delete_profiles"
ON profiles
FOR DELETE
USING (false);

-- =========================================================
-- AUDIT TRAIL
-- =========================================================
CREATE TABLE IF NOT EXISTS audit_trail (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID, -- no FK, log tetap ada meski user dihapus
    table_name  TEXT NOT NULL,
    record_id   UUID,
    action      TEXT NOT NULL,
    old_data    JSONB,
    new_data    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_action
        CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    CONSTRAINT chk_data_presence
        CHECK (old_data IS NOT NULL OR new_data IS NOT NULL)
);

-- =========================================================
-- ACTIVITY LOGS
-- =========================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID, -- no FK, same reason
    event       TEXT NOT NULL,
    status      TEXT,
    metadata    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- /rls/system/rls_activity_logs.sql

CREATE POLICY "select_own_activity_logs"
ON activity_logs
FOR SELECT
USING (
  is_admin_level()
);

CREATE POLICY "no_insert_activity_logs"
ON activity_logs
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_activity_logs"
ON activity_logs
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_activity_logs"
ON activity_logs
FOR DELETE
USING (false);

-- /rls/system/rls_audit_trail.sql

CREATE POLICY "select_own_audit_trail"
ON audit_trail
FOR SELECT
USING (
  is_admin_level()
);

CREATE POLICY "no_insert_audit_trail"
ON audit_trail
FOR INSERT
WITH CHECK (false);

CREATE POLICY "no_update_audit_trail"
ON audit_trail
FOR UPDATE
USING (false);

CREATE POLICY "no_delete_audit_trail"
ON audit_trail
FOR DELETE
USING (false);

CREATE OR REPLACE FUNCTION public.activity_logger(
    p_event TEXT,
    p_status TEXT DEFAULT 'success',
    p_metadata JSONB DEFAULT '{}'::jsonb,
    p_user_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.activity_logs (
        user_id,
        event,
        status,
        metadata
    )
    VALUES (
        COALESCE(p_user_id, auth.uid()),
        p_event,
        p_status,
        p_metadata
    );
-- Catatan: Blok EXCEPTION dihapus agar performa stabil dan tidak menyembunyikan error struktural
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth; -- Ditambahkan pg_catalog dan auth agar auth.uid() terbaca

-- LANGKAH PENGAMANAN TAMBAHAN (Wajib):
-- 1. Cabut hak akses dari semua orang di internet (anon & authenticated)
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada postgres (internal system) dan service_role (backend)
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO postgres;
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO service_role;

CREATE OR REPLACE FUNCTION public.on_auth_user_action()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth
AS $$
BEGIN
    -- Jika user baru saja mendaftar (Sign Up)
    IF TG_OP = 'INSERT' THEN
        PERFORM public.activity_logger(
            'USER_SIGNUP', 
            'success', 
            jsonb_build_object('email', NEW.email), 
            NEW.id
        );
    
    -- Jika user melakukan login (diidentifikasi dari kolom last_sign_in_at yang berubah)
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
            PERFORM public.activity_logger(
                'USER_LOGIN', 
                'success', 
                jsonb_build_object(
                    'email', NEW.email, 
                    'ip_address', auth.auth_metadata() ->> 'ip'
                ),
                NEW.id
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_action_trigger
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.on_auth_user_action();

  -- 1. Cabut izin eksekusi dari publik dan role bawaan API Supabase
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada sistem internal (postgres)
GRANT EXECUTE ON FUNCTION public.on_auth_user_action() TO postgres;

CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- 1. 🚫 Skip self-audit (hindari infinite loop)
    IF TG_TABLE_NAME IN ('audit_trail', 'activity_logs') THEN
        IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;
    END IF;

    -- 2. 🚫 Skip update tanpa perubahan data sama sekali
    IF TG_OP = 'UPDATE' AND NEW IS NOT DISTINCT FROM OLD THEN
        RETURN NEW;
    END IF;

    -- 3. Ambil ID user yang sedang login (bisa NULL jika lewat migration/backend script)
    v_user_id := auth.uid();

    -- 4. 🛡️ Proses pencatatan ke tabel audit
    BEGIN
        INSERT INTO public.audit_trail (
            user_id,
            table_name,
            record_id,
            action,
            old_data,
            new_data
        )
        VALUES (
            v_user_id,
            TG_TABLE_NAME,
            COALESCE(NEW.id, OLD.id),
            TG_OP,
            CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
            CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
        );
    EXCEPTION
        WHEN OTHERS THEN
            NULL;
    END;

    -- 5. Return akhir sebagai penutup fungsi trigger AFTER
    IF TG_OP = 'DELETE' THEN 
        RETURN OLD; 
    ELSE 
        RETURN NEW; 
    END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth;

-- 🔒 LANGKAH WAJIB: Amankan fungsi dari celah API luar
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM anon;

-- Izin eksekusi hanya diberikan ke internal database (postgres) agar trigger tetap bekerja
GRANT EXECUTE ON FUNCTION public.audit_trigger() TO postgres;

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

CREATE TABLE IF NOT EXISTS biodata_keluarga (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    hubungan     hubungan_enum NOT NULL,
    detail_hubungan VARCHAR(50) DEFAULT NULL,
    nama         VARCHAR(255) NOT NULL,
    status_hidup BOOLEAN NOT NULL,
    nik          nik_type,
    no_handphone phone_number,
    pendidikan_keluarga   pendidikan_keluarga_enum,
    pekerjaan    TEXT,
    penghasilan  TEXT,
    tempat_lahir VARCHAR(100),
    tanggal_lahir   DATE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_siswa_hubungan UNIQUE (siswa_id, hubungan),
    CONSTRAINT check_data_hidup CHECK (
        status_hidup = FALSE OR (nik IS NOT NULL AND no_handphone IS NOT NULL)
    ),
    CONSTRAINT check_syarat_wali CHECK (
        hubungan != 'WALI' OR (status_hidup = TRUE AND detail_hubungan IS NOT NULL)
    )
);



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

CREATE POLICY "biz_delete_keluarga"x
ON biodata_keluarga
FOR DELETE
TO authenticated
USING (
  public.is_owner_siswa(siswa_id)
  OR 
  public.has_any_role(ARRAY['ADMINISTRATOR', 'SUPERADMIN']::TEXT[])
);

CREATE TABLE IF NOT EXISTS form_pendaftaran (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id            UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE RESTRICT,
    tahun_ajaran_code     VARCHAR(10) NOT NULL REFERENCES master_tahun_ajaran(code),
    master_lembaga_code   VARCHAR(20) NOT NULL REFERENCES master_lembaga(code),
    master_kelas_code     VARCHAR(20) REFERENCES master_kelas(code),
    master_step_id     SMALLINT NOT NULL REFERENCES master_step(id) DEFAULT 1, 
    status_keputusan_final_pendaftaran VARCHAR(30) DEFAULT 'PENDING',
    finalized_by        UUID REFERENCES auth.users(id),
    finalized_at        TIMESTAMPTZ,
    created_by          UUID NOT NULL REFERENCES auth.users(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_siswa_tahun UNIQUE (siswa_id, tahun_ajaran_code),
    CONSTRAINT check_status_keputusan CHECK (status_keputusan_final_pendaftaran IN ('PENDING', 'ACCEPTED', 'REJECTED', 'AWAITING_LIST')),
    CONSTRAINT check_lembaga_kelas CHECK (master_lembaga_code != 'MI' OR master_kelas_code IS NOT NULL)
);

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

CREATE TABLE IF NOT EXISTS pembayaran (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID UNIQUE NOT NULL REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    amount              NUMERIC(12, 2) NOT NULL,
    paid_at             TIMESTAMPTZ DEFAULT NOW(),
    file_path           TEXT NOT NULL,
    validated_by        UUID REFERENCES auth.users(id),
    status_validasi     status_validasi_enum NOT NULL DEFAULT 'PENDING',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);



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

CREATE TABLE IF NOT EXISTS dokumen (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID NOT NULL REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    file_path           TEXT NOT NULL,
    tipe_dokumen_id     INT NOT NULL REFERENCES master_tipe_dokumen(id),
    validated_by        UUID REFERENCES auth.users(id),
    status_validasi     status_validasi_enum NOT NULL DEFAULT 'PENDING',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_pendaftaran_dokumen_tipe UNIQUE (form_pendaftaran_id, tipe_dokumen_id)
);



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


CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN

    -- create profile safely (idempotent)
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, domain_id, role_id)
    VALUES (NEW.id, 1, 1)
    ON CONFLICT (user_id, domain_id, role_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;

CREATE TRIGGER tr_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_registration();

-- 1. Cabut izin eksekusi dari PUBLIC (termasuk anon dan authenticated)
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM authenticated;

-- 2. Berikan izin eksekusi HANYA kepada postgres (Sistem internal Supabase)
GRANT EXECUTE ON FUNCTION public.handle_new_user_registration() TO postgres;

CREATE TRIGGER tr_audit_biodata_siswa
AFTER INSERT OR UPDATE OR DELETE
ON biodata_siswa
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_biodata_keluarga
AFTER INSERT OR UPDATE OR DELETE
ON biodata_keluarga
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_form_pendaftaran
AFTER INSERT OR UPDATE OR DELETE
ON form_pendaftaran
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_dokumen
AFTER INSERT OR UPDATE OR DELETE
ON dokumen
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_pembayaran
AFTER INSERT OR UPDATE OR DELETE
ON pembayaran
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_pendidikan_siswa_sebelumnya
AFTER INSERT OR UPDATE OR DELETE
ON pendidikan_siswa_sebelumnya
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

-- authority

CREATE TRIGGER tr_audit_profiles
AFTER INSERT OR UPDATE OR DELETE
ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_user_roles
AFTER INSERT OR UPDATE OR DELETE
ON user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();