-- =========================================================
-- 1. EXTENSIONS & CUSTOM TYPES (ENUMS)
-- =========================================================
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
        CHECK (VALUE ~ E'^\\+[1-9][0-9]{7,14}$')
    END IF;
END $$;

-- =========================================================
-- 2. LOOKUP TABLES (MASTER DATA)
-- =========================================================

-- Step Bisnis (Alur Form)
CREATE TABLE IF NOT EXISTS step_bisnis (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) UNIQUE NOT NULL,
    is_revisable  BOOLEAN DEFAULT FALSE
);

INSERT INTO step_bisnis (name, is_revisable) VALUES
    ('Buat Form', FALSE), ('Pembayaran', TRUE), 
    ('Biodata Siswa', TRUE), ('Biodata Ayah', TRUE), ('Biodata Ibu', TRUE), 
    ('Dokumen KK', TRUE), ('Dokumen KTP', TRUE), ('Dokumen AKTE', TRUE), 
    ('Finalisasi', FALSE)
ON CONFLICT (name) DO NOTHING;

-- Status Step (Individu per Form)
CREATE TABLE IF NOT EXISTS status_step_form_pendaftaran (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO status_step_form_pendaftaran (name) VALUES
    ('NOT_STARTED'), ('IN_PROGRESS'), ('SUBMITTED'), ('APPROVED'), ('REVISION_REQUIRED')
ON CONFLICT (name) DO NOTHING;

-- Status Keseluruhan
CREATE TABLE IF NOT EXISTS status_overall_form_pendaftaran (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO status_overall_form_pendaftaran (name) VALUES
('Not Finalized'), ('Finalized')
ON CONFLICT (name) DO NOTHING;

-- Status Keputusan
CREATE TABLE IF NOT EXISTS status_keputusan_final_pendaftaran (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO status_keputusan_final_pendaftaran (name) VALUES
('Pending'), ('Accepted'), ('Rejected'), ('Awaiting List')
ON CONFLICT (name) DO NOTHING;

-- Lembaga 
CREATE TABLE IF NOT EXISTS lembaga_tujuan (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO lembaga_tujuan (name) VALUES ('MI'), ('TK'), ('PAUD'), ('TPA')
ON CONFLICT (name) DO NOTHING;

-- Kelas
CREATE TABLE IF NOT EXISTS master_kelas (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO master_kelas (name) VALUES
('Kelas 1'), ('Kelas 2'), ('Kelas 3'), ('Kelas 4'), ('Kelas 5'), ('Kelas 6')
ON CONFLICT (name) DO NOTHING;

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
    (2025, 2026, 'Genap', FALSE),
    (2026, 2027, 'Ganjil', TRUE),
    (2026, 2027, 'Genap', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

-- Dokumen Master
CREATE TABLE IF NOT EXISTS tipe_dokumen (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO tipe_dokumen (name) VALUES
    ('Kartu Keluarga'), ('Kartu Tanda Penduduk'), ('Akte Kelahiran')
ON CONFLICT (name) DO NOTHING;

-- =========================================================
-- 3. CORE TABLES AKUN USER
-- =========================================================

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username   VARCHAR(50),
    user_role  VARCHAR(20) NOT NULL DEFAULT 'pendaftar',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- 4. OPERATIONAL TABLES (DATA PENDAFTAR)
-- =========================================================

-- Biodata Siswa
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
    golongan_darah      VARCHAR(5),
    penyakit            VARCHAR(255),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_anak_ke_positive CHECK (anak_ke > 0),
    CONSTRAINT check_jumlah_saudara_non_negative CHECK (jumlah_saudara IS NULL OR jumlah_saudara >= 0)
    CONSTRAINT check_golongan_darah CHECK (golongan_darah IN ('A', 'B', 'AB', 'O', 'Tidak Tahu', 'Lainnya') OR golongan_darah IS NULL)
);

-- mapping siswa
CREATE TABLE IF NOT EXISTS mapping_siswa_aktif (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    lembaga_tujuan_id   INT NOT NULL REFERENCES lembaga_tujuan(id),
    master_kelas_id     INT REFERENCES master_kelas(id),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (siswa_id, lembaga_tujuan_id, master_kelas_id)
);

-- mapping ownership

CREATE TABLE IF NOT EXISTS akses_kontrol_siswa (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id    UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    role_akses  VARCHAR(50) CHECK (role_akses IN ('OWNER', 'WALI', 'PENDAMPING')),
    is_active   BOOLEAN DEFAULT FALSE, 
    granted_at  TIMESTAMPTZ DEFAULT NOW(),
    granted_by  UUID REFERENCES auth.users(id), -- Admin yang approve sengketa/klaim
    UNIQUE(siswa_id, user_id)
);

-- Biodata Keluarga
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

CREATE UNIQUE INDEX uniq_active_form_per_siswa
ON form_pendaftaran(siswa_id)
WHERE status_overall_id = 1; -- Not Finalized

-- =========================================================
-- 5. REVISION SYSTEM
-- =========================================================

CREATE TABLE IF NOT EXISTS revisi (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_pendaftaran_id      UUID NOT NULL REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    step_bisnis_id           INT NOT NULL REFERENCES step_bisnis(id) ON DELETE RESTRICT
    status_revisi            VARCHAR(50) NOT NULL CHECK (status_revisi IN ('OPENED', 'REQUESTED', 'RESOLVED', 'REJECTED')),
    requested_by             UUID REFERENCES auth.users(id),
    resolved_by              UUID REFERENCES auth.users(id),
    requested_at             TIMESTAMPTZ DEFAULT NOW(),
    resolved_at              TIMESTAMPTZ,
    user_message             VARCHAR(255),
    admin_message            VARCHAR(255),
    created_at               TIMESTAMPTZ DEFAULT NOW(),
    updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- Constraint agar tidak ada revisi ganda yang menggantung
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_revision_per_step
ON revisi(form_pendaftaran_id, step_bisnis_id)
WHERE status_revisi IN ('OPENED', 'REQUESTED');

-- =========================================================
-- 6. OPERATIONAL SUPPORTS
-- =========================================================

-- Pembayaran
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

-- =========================================================
-- 7. AUDIT LOGGING 
-- =========================================================

CREATE TABLE IF NOT EXISTS audit_trail (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action     TEXT NOT NULL, 
    details    JSONB, 
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT, 
    details JSONB, 
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- 8. INDEXING
-- =========================================================

-- Indeks Tambahan untuk Performa
CREATE INDEX IF NOT EXISTS idx_form_created_by ON form_pendaftaran(created_by);
CREATE INDEX IF NOT EXISTS idx_siswa_owner ON biodata_siswa(akun_pendaftar_id);
CREATE INDEX IF NOT EXISTS idx_form_siswa_id ON form_pendaftaran(siswa_id);
CREATE INDEX IF NOT EXISTS idx_form_lembaga ON form_pendaftaran(lembaga_tujuan_id);
CREATE INDEX IF NOT EXISTS idx_form_kelas   ON form_pendaftaran(master_kelas_id);