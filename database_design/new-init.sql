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

-- Lembaga 
CREATE TABLE IF NOT EXISTS master_lembaga (
    id      BIGINT PRIMARY KEY,
    label   VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO master_lembaga (id, label) VALUES (1, 'MI'), (2, 'TK'), (3, 'KB'), (4, 'TPA')
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
CREATE TABLE IF NOT EXISTS master_tahun_ajaran (
    id            SERIAL PRIMARY KEY,
    tahun_mulai   INT NOT NULL,
    tahun_selesai INT NOT NULL,
    semester      semester_enum NOT NULL,
    is_active     BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT    uniq_tahun_ajaran UNIQUE (tahun_mulai, tahun_selesai, semester),
    CONSTRAINT    check_tahun_valid CHECK (tahun_selesai = tahun_mulai + 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tahun_ajaran_active_unique 
ON master_tahun_ajaran (is_active) WHERE (is_active = TRUE);

INSERT INTO master_tahun_ajaran (tahun_mulai, tahun_selesai, semester, is_active) VALUES
    (2025, 2026, 'GENAP', FALSE),
    (2026, 2027, 'GANJIL', TRUE),
    (2026, 2027, 'GENAP', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

-- Dokumen Master
CREATE TABLE IF NOT EXISTS master_tipe_dokumen (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

INSERT INTO master_tipe_dokumen (code, label) VALUES
    ('KK_TYPE_DOC', 'Kartu Keluarga'), ('KTP_TYPE_DOC', 'Kartu Tanda Penduduk'), 
    ('AKTE_TYPE_DOC', 'Akte Kelahiran')
ON CONFLICT (code) DO NOTHING;

-- Status Rumah Master
CREATE TABLE IF NOT EXISTS master_status_rumah (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

INSERT INTO master_status_rumah (code, label) VALUES
    ('NENEK', 'Nenek'), ('ORTU', 'Orang Tua'), 
    ('SAUDARA', 'Saudara'), ('DINAS', 'Dinas'), ('SEWA/KONTRAK', 'Sewa/Kontrak')
ON CONFLICT (code) DO NOTHING;

-- Tinggal Bersama  Master
CREATE TABLE IF NOT EXISTS master_tinggal_bersama (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL
);

INSERT INTO master_tinggal_bersama (code, label) VALUES
    ('ORTU', 'Orang Tua'), 
    ('SAUDARA', 'Saudara'), ('WALI', 'Wali'), ('PANTI', 'Panti'), ('PESANTREN', 'Pesantren')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS master_roles (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    role_name TEXT NOT NULL,
    role_description TEXT
);

INSERT INTO master_roles (id, code, role_name, role_description) VALUES
    (1, 'PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    (2, 'SUPERADMIN', 'Super Administrator', 'Full system access (DEVELOPER only)'),
    (3, 'ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    (4, 'VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    (5, 'PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS master_domains (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    domain_name TEXT NOT NULL,
    domain_description TEXT
);

INSERT INTO master_domains (id, code, domain_name, domain_description) VALUES
    (1, 'SPMB', 'Sistem Penerimaan Murid Baru', 'Domain pendaftaran & seleksi siswa'),
    (2, 'PUBLIKASI', 'Sistem Publikasi', 'Domain konten & informasi')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id SMALLINT NOT NULL REFERENCES master_roles(id) ON DELETE CASCADE,
    domain_id SMALLINT NOT NULL REFERENCES master_domains(id) ON DELETE CASCADE,

    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
    suspended_at TIMESTAMPTZ,
    suspended_by UUID REFERENCES auth.users(id),

    PRIMARY KEY (user_id, role_id, domain_id)
);

INSERT INTO user_roles (user_id, role_id, domain_id) VALUES
    ('00000000-0000-0000-0000-000000000002', 3, 1),
    ('00000000-0000-0000-0000-000000000002', 3, 2);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_user_role_domain
ON user_roles(user_id, role_id, domain_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_user
ON user_roles(user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_role_domain
ON user_roles(role_id, domain_id);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    legacy_user_id UUID,
    username VARCHAR(255),
    avatar_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- biodata siswa
CREATE TABLE IF NOT EXISTS biodata_siswa (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    akun_pendaftar_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    akun_siswa_id       UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
    is_verified_siswa   BOOLEAN DEFAULT FALSE,
    nama_lengkap        VARCHAR(255) NOT NULL,
    nik                 nik_type,
    nisn                nisn_type,
    no_kk               kk_type,
    gender              gender_enum NOT NULL,
    tempat_lahir        VARCHAR(100),
    tanggal_lahir       DATE,
    agama               VARCHAR(20) DEFAULT 'Islam',
    hobi                VARCHAR(100),
    cita_cita           VARCHAR(100),
    jumlah_saudara      INT DEFAULT 0,
    anak_ke             INT DEFAULT 1,
    golongan_darah      VARCHAR(5),
    penyakit            VARCHAR(255),
    status_rumah_id     INT REFERENCES master_status_rumah(id),
    tinggal_bersama_id  INT REFERENCES master_tinggal_bersama(id),
    alamat              VARCHAR(255),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_jumlah_saudara_positive CHECK (jumlah_saudara >= 0),
    CONSTRAINT check_anak_ke_positive CHECK (anak_ke > 0),
    CONSTRAINT check_golongan_darah CHECK (golongan_darah IN ('A', 'B', 'AB', 'O', 'Tidak Tahu', 'Lainnya') OR golongan_darah IS NULL),
    CONSTRAINT check_verified_siswa_requirements CHECK (
        (is_verified_siswa = TRUE 
            AND nik IS NOT NULL 
            AND no_kk IS NOT NULL 
            AND tempat_lahir IS NOT NULL
            AND tanggal_lahir IS NOT NULL
        )
        OR 
        (is_verified_siswa = FALSE)
    )
);

-- KEEP: deduplication + lookup utama
CREATE UNIQUE INDEX uniq_nik_not_null
ON biodata_siswa(nik)
WHERE nik IS NOT NULL;

-- KEEP: query by akun pendaftar
CREATE INDEX IF NOT EXISTS idx_biodata_akun_pendaftar
ON biodata_siswa(akun_pendaftar_id);

CREATE INDEX idx_biodata_siswa_reclaim_verify
ON biodata_siswa (nik, tanggal_lahir, no_kk);


-- Data Pendidikan Sebelumnya
CREATE TABLE IF NOT EXISTS pendidikan_siswa_sebelumnya (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    nama_sekolah_sebelumnya VARCHAR(255),
    npsn_sekolah_sebelumnya npsn_type,
    alamat_sekolah_sebelumnya VARCHAR(255),
    has_previous_school BOOLEAN,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_pendidikan_siswa UNIQUE (siswa_id),
    CONSTRAINT check_previous_school_info CHECK (
        (has_previous_school = FALSE 
            AND nama_sekolah_sebelumnya IS NULL 
            AND npsn_sekolah_sebelumnya IS NULL 
            AND alamat_sekolah_sebelumnya IS NULL
        )
        OR
        (has_previous_school = TRUE 
            AND nama_sekolah_sebelumnya IS NOT NULL 
            AND alamat_sekolah_sebelumnya IS NOT NULL
        )
    )
);

CREATE INDEX IF NOT EXISTS idx_pendidikan_siswa
ON pendidikan_siswa_sebelumnya(siswa_id);

-- Biodata Keluarga
CREATE TABLE IF NOT EXISTS biodata_keluarga (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    hubungan     hubungan_enum NOT NULL,
    detail_hubungan VARCHAR(50) DEFAULT NULL, -- untuk hubungan WALI, bisa diisi "Paman", "Bibi", dll
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

CREATE INDEX IF NOT EXISTS idx_keluarga_siswa
ON biodata_keluarga(siswa_id);

-- Form Pendaftaran Utama
CREATE TABLE IF NOT EXISTS form_pendaftaran (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id            UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE RESTRICT,
    tahun_ajaran_id     INT NOT NULL REFERENCES master_tahun_ajaran(id),
    master_lembaga_id   INT NOT NULL REFERENCES master_lembaga(id),
    master_kelas_id     INT REFERENCES master_kelas(id),
    master_step_id      INT NOT NULL REFERENCES master_step(id) DEFAULT 1, 
    status_keputusan_final_pendaftaran VARCHAR(30) DEFAULT 'PENDING',
    finalized_by        UUID REFERENCES auth.users(id),
    finalized_at        TIMESTAMPTZ,
    created_by          UUID NOT NULL REFERENCES auth.users(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_siswa_tahun UNIQUE (siswa_id, tahun_ajaran_id),
    CONSTRAINT check_status_keputusan CHECK (status_keputusan_final_pendaftaran IN ('PENDING', 'ACCEPTED', 'REJECTED', 'AWAITING_LIST')),
    CONSTRAINT check_lembaga_kelas CHECK (master_lembaga_id <> 1 OR master_kelas_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_form_created_by
ON form_pendaftaran(created_by);

-- record step
CREATE TABLE form_step_state (
    form_id UUID NOT NULL REFERENCES form_pendaftaran(id) ON DELETE CASCADE,
    step_id SMALLINT NOT NULL REFERENCES master_step(id),

    step_status TEXT NOT NULL DEFAULT 'LOCKED', 
    step_mode TEXT NOT NULL DEFAULT 'READ',     

    is_current BOOLEAN DEFAULT FALSE,

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY (form_id, step_id)
);

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

CREATE INDEX IF NOT EXISTS idx_pembayaran_form
ON pembayaran(form_pendaftaran_id);

-- Dokumen Upload
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

CREATE INDEX IF NOT EXISTS idx_dokumen_form
ON dokumen(form_pendaftaran_id);

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

CREATE INDEX IF NOT EXISTS idx_audit_created_at
ON audit_trail(created_at DESC);


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

CREATE INDEX IF NOT EXISTS idx_activity_created_at
ON activity_logs(created_at DESC);

CREATE TABLE IF NOT EXISTS siswa_reclaim_request (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES auth.users(id),
    current_owner_id UUID NOT NULL REFERENCES auth.users(id),
    status TEXT NOT NULL DEFAULT 'PENDING',
    reason TEXT,
    dokumen_pendukung JSONB DEFAULT '[]'::jsonb,
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_reclaim_status
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    CONSTRAINT chk_requested_not_current
        CHECK (requested_by IS DISTINCT FROM current_owner_id)
);

CREATE UNIQUE INDEX uniq_reclaim_pending_per_siswa
ON siswa_reclaim_request (siswa_id)
WHERE status = 'PENDING';

CREATE INDEX idx_reclaim_siswa
ON siswa_reclaim_request (siswa_id);

CREATE INDEX idx_reclaim_requested_by
ON siswa_reclaim_request (requested_by);

CREATE INDEX idx_reclaim_status
ON siswa_reclaim_request (status);

CREATE INDEX idx_reclaim_created_at
ON siswa_reclaim_request (created_at DESC);

CREATE TABLE IF NOT EXISTS biodata_siswa_owner_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    old_owner_id UUID REFERENCES auth.users(id),
    new_owner_id UUID NOT NULL REFERENCES auth.users(id),
    reclaim_request_id UUID REFERENCES siswa_reclaim_request(id) ON DELETE SET NULL,
    is_manual BOOLEAN NOT NULL DEFAULT FALSE,
    reason TEXT,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_owner_change CHECK (old_owner_id IS DISTINCT FROM new_owner_id),
    CONSTRAINT chk_reclaim_or_manual CHECK (
        is_manual = TRUE OR reclaim_request_id IS NOT NULL
    )
);

CREATE INDEX IF NOT EXISTS idx_owner_history_siswa
ON biodata_siswa_owner_history(siswa_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_new_owner
ON biodata_siswa_owner_history(new_owner_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_changed_at
ON biodata_siswa_owner_history(changed_at DESC);

=============
= publikasi =
=============

-- Tabel Kategori Posts
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_name_not_empty CHECK (trim(name) <> ''),
  CONSTRAINT check_slug_not_empty CHECK (trim(slug) <> '')
);

CREATE UNIQUE INDEX idx_categories_slug_lower
ON categories (lower(slug));

-- Tabel Artikel/Berita
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  featured_image TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  excerpt TEXT,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_status CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT check_slug_not_empty CHECK (trim(slug) <> ''),
  CONSTRAINT check_title_not_empty CHECK (trim(title) <> ''),
  CONSTRAINT check_publish_time CHECK (
    (status = 'published' AND published_at IS NOT NULL) OR
    (status <> 'published')
  )
);

CREATE UNIQUE INDEX idx_posts_slug
ON posts (slug);

CREATE UNIQUE INDEX idx_posts_slug_lower
ON posts (lower(slug));

CREATE INDEX idx_posts_status
ON posts (status);

CREATE INDEX idx_posts_author
ON posts (author_id);

CREATE INDEX idx_posts_category
ON posts (category_id);

CREATE INDEX idx_posts_published_at
ON posts (published_at DESC)
WHERE status = 'published';

CREATE INDEX idx_posts_created_at
ON posts (created_at DESC);

-- Pengaturan Website
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_key_not_empty CHECK (trim(key) <> '')
);