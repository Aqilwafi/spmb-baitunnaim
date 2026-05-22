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