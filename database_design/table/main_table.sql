CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    legacy_user_id UUID, -- abaikan ini. Hanya untuk migrasi data lama, nanti akan dihapus
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
    status_rumah_id     VARCHAR(100) REFERENCES master_status_rumah(code),
    tinggal_bersama_id  VARCHAR(100) REFERENCES master_tinggal_bersama(code),
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

-- Data Pendidikan Sebelumnya
CREATE TABLE IF NOT EXISTS pendidikan_siswa_sebelumnya (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id     UUID NOT NULL REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    nama_sekolah_sebelumnya VARCHAR(255),
    npsn_sekolah_sebelumnya npsn_type,
    tahun_lulus INT,
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

-- Biodata Keluarga
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

-- Form Pendaftaran Utama
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

-- Tabel Artikel/Berita
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author VARCHAR(255) NOT NULL DEFAULT 'Admin Publikasi',
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- 1. TAMBAHKAN UNIQUE DI SINI
  content TEXT,
  featured_image TEXT,
  category VARCHAR(255) NOT NULL DEFAULT 'Umum',
  post_status TEXT NOT NULL DEFAULT 'draft',
  excerpt TEXT,
  is_featured BOOLEAN DEFAULT FALSE, -- 2. TAMBAHKAN INI untuk properti "unggulan"
  published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Membutuhkan tabel profiles
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT check_status CHECK (post_status IN ('draft', 'published', 'archived')),
  CONSTRAINT check_slug_not_empty CHECK (trim(slug) <> ''),
  CONSTRAINT check_title_not_empty CHECK (trim(title) <> ''),
  CONSTRAINT check_publish_time CHECK (
    (post_status = 'published' AND published_at IS NOT NULL) OR
    (post_status <> 'published')
  )
);

-- Pengaturan Website
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_key_not_empty CHECK (trim(key) <> '')
);