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
    (2025, 2026, 'Genap', FALSE),
    (2026, 2027, 'Ganjil', TRUE),
    (2026, 2027, 'Genap', FALSE)
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