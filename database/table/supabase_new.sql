-- =========================================================
-- 0. EXTENSION
-- =========================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- 1. STAGING TABLE: MIGRATION USER (IDENTITY BRIDGE)
-- =========================================================
CREATE TABLE IF NOT EXISTS migration_user (
  old_user_id UUID NOT NULL,
  new_user_id UUID NULL,

  original_email TEXT,
  email_to_auth TEXT,

  email_status TEXT NOT NULL DEFAULT 'pending',

  created_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT migration_user_pkey PRIMARY KEY (old_user_id)
);

-- Unique email for auth safety
ALTER TABLE migration_user
ADD CONSTRAINT IF NOT EXISTS migration_user_email_to_auth_unique
UNIQUE (email_to_auth);

-- Indexes for batch processing
CREATE INDEX IF NOT EXISTS idx_migration_user_email_status
ON migration_user (email_status);

CREATE INDEX IF NOT EXISTS idx_migration_user_email_to_auth
ON migration_user (email_to_auth);

-- =========================================================
-- 2. PROFILES TABLE (DOMAIN LAYER)
-- =========================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    user_role TEXT NOT NULL DEFAULT 'pendaftar',

    -- important for migration traceability
    legacy_user_id UUID,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- 3. AUDIT TRAIL (EVENT LOGGING)
-- =========================================================
CREATE TABLE IF NOT EXISTS audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID,

    action TEXT,
    details JSONB,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user_id
ON audit_trail(user_id);

-- =========================================================
-- 4. TRIGGER FUNCTION: AUTO CREATE PROFILE + AUDIT
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN

    -- create profile safely (idempotent)
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;

    -- audit log
    INSERT INTO public.audit_trail (user_id, action, details)
    VALUES (
        NEW.id,
        'USER_CREATED',
        jsonb_build_object(
            'message', 'Auto profile created from auth signup'
        )
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================
-- 5. TRIGGER ON AUTH USERS
-- =========================================================
DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;

CREATE TRIGGER tr_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_registration();

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('LAKI-LAKI', 'PEREMPUAN');
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

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pendidikan_terakhir_enum') THEN
        CREATE TYPE pendidikan_terakhir_enum AS ENUM ('SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3', 'LAINNYA');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pekerjaan_enum') THEN
        CREATE TYPE pekerjaan_enum AS ENUM ('GURU', 'KARYAWAN', 'PNS', 'PENGUSAHA', 'LAINNYA');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'penghasilan_enum') THEN
        CREATE TYPE penghasilan_enum AS ENUM ('< 1 juta', '1-2 juta', '2-3 juta', '3-5 juta', '5-10 juta', '>10 juta');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nik_type') THEN
        CREATE DOMAIN nik_type AS VARCHAR(20)
        CHECK (VALUE ~ '^[0-9]{16}$');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nisn_type') THEN
        CREATE DOMAIN nisn_type AS VARCHAR(20)
        CHECK (VALUE ~ '^[0-9]{10}$');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kk_type') THEN
        CREATE DOMAIN kk_type AS VARCHAR(20)
        CHECK (VALUE ~ '^[0-9]{16}$');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'phone_number') THEN
        CREATE DOMAIN phone_number AS TEXT
        CHECK (VALUE ~ E'^\\+[1-9][0-9]{7,14}$');
    END IF;
END $$;

-- =========================================================
-- 2. LOOKUP TABLES (MASTER DATA)
-- =========================================================

-- Step Bisnis (Alur Form)
CREATE TABLE IF NOT EXISTS step_bisnis (
    id            SERIAL PRIMARY KEY,
    code          VARCHAR(50) UNIQUE NOT NULL,
    label         VARCHAR(100) NOT NULL,
    is_revisable  BOOLEAN DEFAULT FALSE
);

INSERT INTO step_bisnis (code, label, is_revisable) VALUES
    ('FORM', 'Buat Form', FALSE), ('PAYMENT', 'Pembayaran', TRUE), 
    ('STUDENT_BIODATA', 'Biodata Siswa', TRUE), ('FATHER_BIODATA', 'Biodata Ayah', TRUE), 
    ('MOTHER_BIODATA', 'Biodata Ibu', TRUE), ('KK_DOCUMENT', 'Dokumen KK', TRUE), 
    ('KTP_DOCUMENT', 'Dokumen KTP', TRUE), ('AKTE_DOCUMENT', 'Dokumen AKTE', TRUE), 
    ('FINALIZE_FORM','Finalisasi', FALSE)
ON CONFLICT (code) DO NOTHING;

-- Status Step (Individu per Form)
CREATE TABLE IF NOT EXISTS status_step_form_pendaftaran (
    id      SERIAL PRIMARY KEY,
    code    VARCHAR(50) UNIQUE NOT NULL,
    label   VARCHAR(100) NOT NULL
);

INSERT INTO status_step_form_pendaftaran (code, label) VALUES
    ('NOT_STARTED', 'Belum Dimulai'), ('IN_PROGRESS', 'Dalam Proses'), ('SUBMITTED', 'Telah Submit'), 
    ('APPROVED', 'Telah Divalidasi'), ('REVISION_REQUIRED', 'Revisi Dibutuhkan')
ON CONFLICT (code) DO NOTHING;

-- Status Keseluruhan
CREATE TABLE IF NOT EXISTS status_overall_form_pendaftaran (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    label   VARCHAR(100) NOT NULL
);

INSERT INTO status_overall_form_pendaftaran (code, label) VALUES
('NOT_FINALIZED', 'Belum Finalisasi Form'), ('FINALIZED', 'Sudah Finalisasi Form')
ON CONFLICT (code) DO NOTHING;

-- Status Keputusan
CREATE TABLE IF NOT EXISTS status_keputusan_final_pendaftaran (
    id      SERIAL PRIMARY KEY,
    code    VARCHAR(50) UNIQUE NOT NULL,
    label   VARCHAR(100) NOT NULL
);

INSERT INTO status_keputusan_final_pendaftaran (code, label) VALUES
('PENDING', 'Menunggu'), ('ACCEPTED', 'Diterima'), ('REJECTED', 'Ditolak'), 
('AWAITING_LIST', 'Cadangan')
ON CONFLICT (code) DO NOTHING;

-- Lembaga 
CREATE TABLE IF NOT EXISTS lembaga_tujuan (
    id      SERIAL PRIMARY KEY,
    label   VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO lembaga_tujuan (label) VALUES ('MI'), ('TK'), ('PAUD'), ('TPA')
ON CONFLICT (label) DO NOTHING;

-- Kelas
CREATE TABLE IF NOT EXISTS master_kelas (
    id   SERIAL PRIMARY KEY,
    label VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO master_kelas (label) VALUES
('Kelas 1'), ('Kelas 2'), ('Kelas 3'), ('Kelas 4'), ('Kelas 5'), ('Kelas 6')
ON CONFLICT (label) DO NOTHING;

-- Tahun Ajaran
CREATE TABLE IF NOT EXISTS tahun_ajaran (
    id            SERIAL PRIMARY KEY,
    tahun_mulai   INT NOT NULL,
    tahun_selesai INT NOT NULL,
    semester      semester_enum NOT NULL,
    is_active     BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT    unique_tahun_ajaran UNIQUE (tahun_mulai, tahun_selesai, semester),
    CONSTRAINT    check_tahun_valid CHECK (tahun_selesai = tahun_mulai + 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tahun_ajaran_active_unique 
ON tahun_ajaran (is_active) WHERE (is_active = TRUE);

INSERT INTO tahun_ajaran (tahun_mulai, tahun_selesai, semester, is_active) VALUES
    (2025, 2026, 'GENAP', FALSE),
    (2026, 2027, 'GANJIL', TRUE),
    (2026, 2027, 'GENAP', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

-- Dokumen Master
CREATE TABLE IF NOT EXISTS tipe_dokumen (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

INSERT INTO tipe_dokumen (code, label) VALUES
    ('KK_TYPE_DOC', 'Kartu Keluarga'), ('KTP_TYPE_DOC', 'Kartu Tanda Penduduk'), 
    ('AKTE_TYPE_DOC', 'Akte Kelahiran')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS biodata_siswa (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    akun_pendaftar_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    akun_siswa_id       UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
    is_verified_siswa   BOOLEAN DEFAULT FALSE,
    nama_lengkap        VARCHAR(255) NOT NULL,
    nik                 nik_type UNIQUE,
    nisn                nisn_type UNIQUE,
    no_kk               kk_type,
    gender              gender_enum NOT NULL,
    tempat_lahir        VARCHAR(100),
    tanggal_lahir       DATE,
    agama               VARCHAR(20) DEFAULT 'Islam',
    hobi                VARCHAR(100),
    cita_cita           VARCHAR(100),
    jumlah_saudara      INT,
    anak_ke             INT DEFAULT 1,
    golongan_darah      VARCHAR(10),
    penyakit            VARCHAR(255),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_anak_ke_positive CHECK (anak_ke > 0),
    CONSTRAINT check_jumlah_saudara_non_negative CHECK (jumlah_saudara IS NULL OR jumlah_saudara >= 0),
    CONSTRAINT check_golongan_darah CHECK (golongan_darah IN ('A', 'B', 'AB', 'O', 'LAINNYA') OR golongan_darah IS NULL)
);

CREATE TABLE IF NOT EXISTS biodata_keluarga (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    hubungan     hubungan_enum NOT NULL,
    nama         VARCHAR(255) NOT NULL,
    nik          nik_type,
    no_handphone phone_number,
    pekerjaan    pekerjaan_enum,
    pendidikan   pendidikan_terakhir_enum,
    penghasilan  penghasilan_enum,
    alamat       VARCHAR(1000),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (siswa_id, hubungan)
);

-- Tempat Tinggal
CREATE TABLE IF NOT EXISTS tempat_tinggal_siswa (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    alamat       VARCHAR(1000),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Form Pendaftaran Utama
CREATE TABLE IF NOT EXISTS form_pendaftaran (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id            UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE RESTRICT,
    tahun_ajaran_id     INT NOT NULL REFERENCES tahun_ajaran(id),
    lembaga_tujuan_id   INT NOT NULL REFERENCES lembaga_tujuan(id),
    master_kelas_id     INT REFERENCES master_kelas(id),
    current_step_bisnis_id INT NOT NULL REFERENCES step_bisnis(id) DEFAULT 1,
    has_active_revision BOOLEAN DEFAULT FALSE,
    status_overall_id   INT NOT NULL REFERENCES status_overall_form_pendaftaran(id) DEFAULT 1, 
    status_keputusan_final_pendaftaran_id INT NOT NULL REFERENCES status_keputusan_final_pendaftaran(id) DEFAULT 1,
    finalized_by        UUID REFERENCES auth.users(id),
    finalized_at        TIMESTAMPTZ,
    created_by          UUID NOT NULL REFERENCES auth.users(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_siswa_tahun UNIQUE (siswa_id, tahun_ajaran_id)
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

-- Dokumen Upload
CREATE TABLE IF NOT EXISTS dokumen (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id UUID NOT NULL REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    file_path           TEXT NOT NULL,
    tipe_dokumen_id     INT NOT NULL REFERENCES tipe_dokumen(id),
    validated_by        UUID REFERENCES auth.users(id),
    status_validasi     status_validasi_enum NOT NULL DEFAULT 'PENDING',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (form_pendaftaran_id, tipe_dokumen_id)
);