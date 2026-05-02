-- =========================================================
-- 1. EXTENSIONS & ENUMS
-- =========================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('Laki-laki', 'Perempuan');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hubungan_enum') THEN
        CREATE TYPE hubungan_enum AS ENUM ('Ayah', 'Ibu', 'Wali');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'semester_enum') THEN
        CREATE TYPE semester_enum AS ENUM ('Ganjil', 'Genap');
    END IF;
END $$;

-- =========================================================
-- 2. LOOKUP TABLES
-- =========================================================
CREATE TABLE IF NOT EXISTS step_bisnis (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO step_bisnis (name) VALUES
('Daftar Akun'), ('Lembaga Tujuan'), ('Pembayaran'), ('Biodata Siswa'),
('Biodata Ayah'), ('Biodata Ibu'), ('Dokumen'), ('Validasi Akhir'), ('Pengumuman')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS pendidikan_terakhir (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO pendidikan_terakhir (name) VALUES
('SD'), ('SMP'), ('SMA'), ('D3'), ('S1'), ('S2'), ('S3')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS pekerjaan (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO pekerjaan (name) VALUES
('Guru'), ('Karyawan'), ('PNS'), ('Wiraswasta'), ('Lainnya')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS penghasilan (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO penghasilan (name) VALUES
('< 1 juta'), ('1-2 juta'), ('2-3 juta'), ('3-5 juta'), ('5-10 juta'), ('>10 juta')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS status_verifikasi (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO status_verifikasi (name) VALUES
('Pending'), ('Approved'), ('Revision Required')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS status_revisi (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
); 

INSERT INTO status_revisi (name) VALUES
('Resolved'), ('Opened')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS status_request_revisi (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
); 

INSERT INTO status_request_revisi (name) VALUES
('Requested'), ('Accepted'), ('Rejected')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS status_final_pendaftaran (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO status_final_pendaftaran (name) VALUES
('Pending'), ('Accepted'), ('Rejected'), ('Awaiting List')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS lembaga_tujuan (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO lembaga_tujuan (name) VALUES
('MI'), ('TK'), ('PAUD'), ('TPA')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS kelas_mi (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO kelas_mi (name) VALUES
('Non-MI'), ('Kelas 1'), ('Kelas 2'), ('Kelas 3'), ('Kelas 4'), ('Kelas 5'), ('Kelas 6')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS tahun_ajaran (
  id SERIAL PRIMARY KEY,
  tahun_mulai INT NOT NULL,
  tahun_selesai INT NOT NULL,
  semester semester_enum NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_tahun_ajaran UNIQUE (tahun_mulai, tahun_selesai, semester),
  CONSTRAINT check_tahun_valid CHECK (tahun_selesai = tahun_mulai + 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tahun_ajaran_active_unique 
ON tahun_ajaran (is_active) 
WHERE (is_active = TRUE);

INSERT INTO tahun_ajaran (tahun_mulai, tahun_selesai, semester, is_active) VALUES
(2025, 2026, 'Genap', FALSE),
(2026, 2027, 'Ganjil', TRUE),
(2026, 2027, 'Genap', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

CREATE TABLE IF NOT EXISTS tipe_dokumen (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO tipe_dokumen (name) VALUES
('Kartu Keluarga'), ('Kartu Tanda Penduduk'), ('Akte Kelahiran')
ON CONFLICT (name) DO NOTHING;

-- =========================================================
-- 3. CORE TABLES
-- =========================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_role TEXT NOT NULL DEFAULT 'pendaftar',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_pendaftaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    tahun_ajaran_id INT REFERENCES tahun_ajaran(id) NOT NULL,
    lembaga_tujuan_id INT REFERENCES lembaga_tujuan(id) NOT NULL, 
    kelas_mi_id INT REFERENCES kelas_mi(id) NOT NULL DEFAULT 1,
    max_reached_step_id INT REFERENCES step_bisnis(id) NOT NULL DEFAULT 2, -- memang otomatis sampai step 2 saat pertama insert. tidak bisa mundur.
 
    is_request_revision BOOLEAN DEFAULT FALSE, -- permitaan user/pendaftar
    is_need_revision BOOLEAN DEFAULT FALSE, -- admin mengharuskan revisi
    is_finalize_form BOOLEAN DEFAULT FALSE, -- form sudah final, siap dinilai.

    status_final_pendaftaran_id INT REFERENCES status_final_pendaftaran(id) NOT NULL DEFAULT 1,
    finalized_by UUID REFERENCES auth.users(id),
    finalized_at TIMESTAMPTZ,
    finalized_message TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS revisi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    step_id INT REFERENCES step_bisnis(id),
    requested_by UUID REFERENCES auth.users(id),
    status_revisi_id INT REFERENCES status_revisi(id) NOT NULL DEFAULT 1,
    status_request_revisi_id INT REFERENCES status_request_revisi(id) NOT NULL DEFAULT 1,
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    user_message TEXT,
    admin_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_pendaftaran_user_id ON form_pendaftaran(user_id);
CREATE INDEX IF NOT EXISTS idx_form_pendaftaran_lembaga ON form_pendaftaran(lembaga_tujuan_id);
CREATE INDEX IF NOT EXISTS idx_form_pendaftaran_kelas ON form_pendaftaran(kelas_mi_id);

-- =========================================================
-- 4. OPERATIONAL TABLES
-- =========================================================
CREATE TABLE IF NOT EXISTS biodata_siswa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID UNIQUE REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    nama_lengkap TEXT NOT NULL,
    nisn VARCHAR(20),
    nik VARCHAR(20),
    no_kk VARCHAR(20),
    jenis_kelamin gender_enum NOT NULL,
    tempat_lahir TEXT,
    tanggal_lahir DATE,
    agama VARCHAR(20) DEFAULT 'Islam',
    hobi TEXT,
    cita_cita TEXT,
    jumlah_saudara INT,
    anak_ke INT DEFAULT 1,
    golongan_darah VARCHAR(5),
    penyakit VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_biodata_siswa_pendaftaran_id ON biodata_siswa(pendaftaran_id);

CREATE TABLE IF NOT EXISTS biodata_keluarga (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    hubungan hubungan_enum NOT NULL,
    nama TEXT NOT NULL,
    nik VARCHAR(20),
    no_handphone VARCHAR(30),
    pekerjaan TEXT,
    pendidikan TEXT,
    penghasilan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (siswa_id, hubungan)
);

CREATE TABLE IF NOT EXISTS tempat_tinggal_siswa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    alamat TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pembayaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID UNIQUE REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    paid_at TIMESTAMPTZ DEFAULT NOW(),
    file_path TEXT NOT NULL,
    validated_by UUID REFERENCES auth.users(id),
    status_validasi status_validasi_enum NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dokumen (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    tipe_dokumen_id INT NOT NULL REFERENCES tipe_dokumen(id),
    validated_by UUID REFERENCES auth.users(id),
    status_validasi status_validasi_enum NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (pendaftaran_id, tipe_dokumen_id)
);

CREATE TABLE IF NOT EXISTS audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT, 
    details JSONB, 
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- 5. FUNCTIONS & TRIGGERS
-- =========================================================

-- A. Auto updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger Pendaftaran
DROP TRIGGER IF EXISTS trg_update_pendaftaran ON form_pendaftaran;
CREATE TRIGGER trg_update_pendaftaran BEFORE UPDATE ON form_pendaftaran FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Profiles
DROP TRIGGER IF EXISTS trg_update_profiles ON profiles;
CREATE TRIGGER trg_update_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Biodata Siswa
DROP TRIGGER IF EXISTS trg_update_biodata_siswa ON biodata_siswa;
CREATE TRIGGER trg_update_biodata_siswa BEFORE UPDATE ON biodata_siswa FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Biodata Keluarga
DROP TRIGGER IF EXISTS trg_update_biodata_keluarga ON biodata_keluarga;
CREATE TRIGGER trg_update_biodata_keluarga BEFORE UPDATE ON biodata_keluarga FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Tempat Tinggal Siswa
DROP TRIGGER IF EXISTS trg_update_tempat_tinggal_siswa ON tempat_tinggal_siswa;
CREATE TRIGGER trg_update_tempat_tinggal_siswa BEFORE UPDATE ON tempat_tinggal_siswa FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Pembayaran
DROP TRIGGER IF EXISTS trg_update_pembayaran ON pembayaran;
CREATE TRIGGER trg_update_pembayaran BEFORE UPDATE ON pembayaran FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Dokumen
DROP TRIGGER IF EXISTS trg_update_dokumen ON dokumen;
CREATE TRIGGER trg_update_dokumen BEFORE UPDATE ON dokumen FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Revisi
DROP TRIGGER IF EXISTS trg_update_revisi ON revisi;
CREATE TRIGGER trg_update_revisi BEFORE UPDATE ON revisi FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- B. Audit Log
CREATE OR REPLACE FUNCTION fn_audit_log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_trail (user_id, action, details)
    VALUES (auth.uid(), TG_OP || ' ON ' || TG_TABLE_NAME, jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW)));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger audit form_pendaftaran
DROP TRIGGER IF EXISTS tr_audit_pendaftaran ON form_pendaftaran;
CREATE TRIGGER tr_audit_pendaftaran AFTER UPDATE ON form_pendaftaran FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit biodata_siswa
DROP TRIGGER IF EXISTS tr_audit_biodata_siswa ON biodata_siswa;
CREATE TRIGGER tr_audit_biodata_siswa AFTER UPDATE ON biodata_siswa FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit biodata_keluarga
DROP TRIGGER IF EXISTS tr_audit_biodata_keluarga ON biodata_keluarga;
CREATE TRIGGER tr_audit_biodata_keluarga AFTER UPDATE ON biodata_keluarga FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit tempat_tinggal_siswa
DROP TRIGGER IF EXISTS tr_audit_tempat_tinggal_siswa ON tempat_tinggal_siswa;
CREATE TRIGGER tr_audit_tempat_tinggal_siswa AFTER UPDATE ON tempat_tinggal_siswa FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit pembayaran
DROP TRIGGER IF EXISTS tr_audit_pembayaran ON pembayaran;
CREATE TRIGGER tr_audit_pembayaran AFTER UPDATE ON pembayaran FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit dokumen
DROP TRIGGER IF EXISTS tr_audit_dokumen ON dokumen;
CREATE TRIGGER tr_audit_dokumen AFTER UPDATE ON dokumen FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit revisi
DROP TRIGGER IF EXISTS tr_audit_revisi ON revisi;
CREATE TRIGGER tr_audit_revisi AFTER UPDATE ON revisi FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- C. Auth Registration Handler
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id) VALUES (NEW.id);
    INSERT INTO public.audit_trail (user_id, action, details)
    VALUES (NEW.id, 'INSERT ON profiles', jsonb_build_object('message', 'Otomatis profil pendaftar baru', 'email', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;
CREATE TRIGGER tr_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();

-- D. Role Protection
CREATE OR REPLACE FUNCTION public.prevent_unauthorized_role_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.user_role <> NEW.user_role) AND (COALESCE(auth.jwt() -> 'raw_app_meta_data' ->> 'role', '') <> 'superadmin') THEN
        RAISE EXCEPTION 'Akses Ditolak: Hanya Superadmin yang bisa mengubah Role.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_protect_user_role ON public.profiles;
CREATE TRIGGER tr_protect_user_role
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_unauthorized_role_change();

-- E. Tahun Ajaran Active Switcher
CREATE OR REPLACE FUNCTION fn_switch_tahun_ajaran_active()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_active = TRUE THEN
        UPDATE tahun_ajaran 
        SET is_active = FALSE 
        WHERE id <> NEW.id AND is_active = TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_switch_tahun_ajaran ON tahun_ajaran;
CREATE TRIGGER tr_switch_tahun_ajaran
BEFORE UPDATE ON tahun_ajaran
FOR EACH ROW
WHEN (NEW.is_active IS DISTINCT FROM OLD.is_active AND NEW.is_active = TRUE)
EXECUTE FUNCTION fn_switch_tahun_ajaran_active();

-- =========================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================
ALTER TABLE form_pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE biodata_siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE biodata_keluarga ENABLE ROW LEVEL SECURITY;
ALTER TABLE tempat_tinggal_siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembayaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE revisi ENABLE ROW LEVEL SECURITY;

ALTER TABLE lembaga_tujuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas_mi ENABLE ROW LEVEL SECURITY;
ALTER TABLE step_bisnis ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipe_dokumen ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_verifikasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_revisi ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_request_revisi ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_final_pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE tahun_ajaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE pekerjaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendidikan_terakhir ENABLE ROW LEVEL SECURITY;
ALTER TABLE penghasilan ENABLE ROW LEVEL SECURITY;

-- Tabel Lookup (Read-Only bagi User)
DO $$ 
DECLARE 
    t nama_tabel[] := ARRAY['lembaga_tujuan', 'kelas_mi', 'tahun_ajaran', 'status_verifikasi', 'status_revisi', 'status_request_revisi', 'status_final_pendaftaran', 'step_bisnis', 'tipe_dokumen', 'pekerjaan', 'pendidikan_terakhir', 'penghasilan'];
    tbl_name text;
BEGIN
    FOREACH tbl_name IN ARRAY t LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl_name);
        EXECUTE format('DROP POLICY IF EXISTS "Public Read" ON %I', tbl_name);
        EXECUTE format('CREATE POLICY "Public Read" ON %I FOR SELECT USING (true)', tbl_name);
    END LOOP;
END $$;

DO $$ 
BEGIN
    -- Profiles Policies

    DROP POLICY IF EXISTS "Users can see their own profile" ON profiles;
    CREATE POLICY "Users can see their own profile" ON profiles FOR SELECT
    USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Enable read access for all admins to pendaftar only" ON profiles;
    CREATE POLICY "Enable read access for all admins to pendaftar only" ON profiles FOR SELECT
    USING (auth.jwt() -> 'raw_app_meta_data' ->> 'role' IN ('staff', 'committee', 'validator', 'administrator', 'superadmin')
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND user_role IN ('staff', 'committee', 'validator', 'administrator', 'superadmin')
        )
        AND user_role = 'pendaftar'
    );
    
    DROP POLICY IF EXISTS "Strict administrator Update Access" ON profiles;
    CREATE POLICY "Strict administrator Update Access" ON profiles FOR UPDATE
    USING (
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'administrator'
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND user_role = 'administrator'
        )
        AND user_role NOT IN ('superadmin', 'administrator')
    )
    WITH CHECK (
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'administrator'
        AND user_role IN ('pendaftar', 'validator', 'committee', 'staff')
    );

    -- Pendaftaran Policies
    DROP POLICY IF EXISTS "User can access own pendaftaran" ON form_pendaftaran;
    CREATE POLICY "User can access own pendaftaran" ON form_pendaftaran FOR ALL
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

    -- Biodata Siswa Policies
    DROP POLICY IF EXISTS "Users can insert their own student biodata" ON biodata_siswa;
    CREATE POLICY "Users can insert their own student biodata" ON biodata_siswa FOR INSERT
    TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM form_pendaftaran WHERE form_pendaftaran.id = biodata_siswa.pendaftaran_id AND form_pendaftaran.user_id = auth.uid()));

    DROP POLICY IF EXISTS "Users can view their own student biodata" ON biodata_siswa;
    CREATE POLICY "Users can view their own student biodata" ON biodata_siswa FOR SELECT
    TO authenticated USING (EXISTS (SELECT 1 FROM form_pendaftaran WHERE form_pendaftaran.id = biodata_siswa.pendaftaran_id AND form_pendaftaran.user_id = auth.uid()));

    -- Lookup Tables Policies (Public Read)
    DROP POLICY IF EXISTS "Public read lembaga" ON lembaga_tujuan;
    CREATE POLICY "Public read lembaga" ON lembaga_tujuan FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public read kelas" ON kelas_mi;
    CREATE POLICY "Public read kelas" ON kelas_mi FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public read status_final" ON status_final;
    CREATE POLICY "Public read status_final" ON status_final FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public read steps" ON step_bisnis;
    CREATE POLICY "Public read steps" ON step_bisnis FOR SELECT USING (true);
END $$;


CREATE OR REPLACE FUNCTION validate_lembaga_kelas()
RETURNS TRIGGER AS $$
DECLARE
    mi_id INT;
BEGIN
    -- Ambil ID lembaga MI secara dinamis
    SELECT id INTO mi_id FROM lembaga_tujuan WHERE name = 'MI';

    -- Logika Validasi
    IF (NEW.lembaga_tujuan_id = mi_id AND NEW.kelas_mi_id IS NULL) THEN
        RAISE EXCEPTION 'Lembaga MI wajib memilih kelas.';
    ELSIF (NEW.lembaga_tujuan_id != mi_id AND NEW.kelas_mi_id IS NOT NULL) THEN
        RAISE EXCEPTION 'Lembaga selain MI tidak boleh memiliki kelas MI.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Pasang Trigger-nya
CREATE TRIGGER trg_validate_lembaga_kelas
BEFORE INSERT OR UPDATE ON form_pendaftaran
FOR EACH ROW EXECUTE FUNCTION validate_lembaga_kelas();