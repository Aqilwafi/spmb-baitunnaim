create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- master_domains
-- ---------------------------------------------------------
create table master_domains (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_domains is
'Application domains (SPMB, PUBLIKASI, LMS, etc.). A user may have different roles in different domains.';

-- ---------------------------------------------------------
-- master_roles
-- ---------------------------------------------------------
create table master_roles (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_roles is
'System roles used for RBAC.';

-- ---------------------------------------------------------
-- master_lembaga
-- ---------------------------------------------------------
create table master_lembaga (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(150) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_lembaga is
'Institution / educational unit available within a domain.';

-- ---------------------------------------------------------
-- master_kelas
-- ---------------------------------------------------------
create table master_kelas (
    id          smallint     primary key generated always as identity,
    lembaga_id  smallint     not null references master_lembaga(id) on delete cascade,
    code        varchar(30)  not null check (code = upper(code)),
    label       varchar(100) not null,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now(),
    constraint uq_kelas_lembaga_code unique (lembaga_id, code)
);

comment on table master_kelas is
'Classes belonging to a specific institution.';

-- ---------------------------------------------------------
-- master_tahun_ajaran
-- ---------------------------------------------------------
create table master_tahun_ajaran (
    id          smallint      primary key generated always as identity,
    semester    semester_enum not null,
    start_year  int           not null,
    end_year    int           not null,
    code        varchar       generated always as (
        start_year::text || '-' || end_year::text || '_' || semester::text
    ) stored,
    label       varchar(50)   not null,
    is_active   boolean       not null default true,
    created_at  timestamptz   not null default now(),
    updated_at  timestamptz   not null default now(),
    constraint uq_tahun_ajaran_code unique (start_year, end_year, semester),
    constraint chk_tahun_ajaran_year check (start_year < end_year)
);

comment on table master_tahun_ajaran is
'Academic year. The same NIK may register again in a different academic year.';

-- ---------------------------------------------------------
-- master_step
-- ---------------------------------------------------------
create table master_step (
    id          smallint     primary key generated always as identity,
    step_order  smallint     not null,
    code        varchar(30)  not null check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_step is
'Configurable registration steps.';

-- ---------------------------------------------------------
-- master_tipe_dokumen
-- ---------------------------------------------------------
create table master_tipe_dokumen (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_required boolean      not null default true,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_tipe_dokumen is
'Required document types. Additional document types may be added without altering schema.';

-- ---------------------------------------------------------
-- master_status_rumah
-- ---------------------------------------------------------
create table master_status_rumah (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_status_rumah is
'Residence ownership status.';

-- ---------------------------------------------------------
-- master_tinggal_bersama
-- ---------------------------------------------------------
create table master_tinggal_bersama (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_tinggal_bersama is
'Living arrangement of the student.';

-- ---------------------------------------------------------
-- profiles
-- ---------------------------------------------------------
create table profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    account_name   varchar(150),
    phone       varchar(20),
    avatar_url  text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);
comment on table profiles is 'Profil pengguna, 1:1 dengan auth.users. Disinkronkan via functions/auth.';

-- ---------------------------------------------------------
-- user_roles
-- ---------------------------------------------------------
create table user_roles (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references profiles(id) on delete cascade,
    role_id     smallint not null references master_roles(id) on delete restrict,
    domain_id   smallint not null references master_domains(id) on delete restrict,
    is_active   boolean     not null default true,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now(),
    constraint uq_user_role_domain unique (user_id, role_id, domain_id)
);
comment on table user_roles is 'Pemetaan role per user per domain. Contoh: Ahmad = VERIFIKATOR@SPMB, PUBLIKATOR@PUBLIKASI.';

-- ---------------------------------------------------------
-- biodata_siswa
-- ---------------------------------------------------------
create table biodata_siswa (
    id                  uuid primary key default gen_random_uuid(),
    owner_user_id       uuid references profiles(id) not null on delete restrict,
    nik                 varchar(16) unique not null check (nik ~ '^[0-9]{16}$'),
    nisn                varchar(10) unique check (nisn is null or nisn ~ '^[0-9]{10}$'),
    no_kk               varchar(16) not null check (no_kk ~ '^[0-9]{16}$'),
    nama_lengkap        varchar(255) not null,
    tempat_lahir        varchar(255) not null,
    tanggal_lahir       date not null,
    jenis_kelamin       gender_enum  not null,
    lembaga_id          smallint not null references master_lembaga(id) on delete restrict,
    kelas_id            smallint references master_kelas(id) on delete restrict,
    catatan             text,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now(),
    constraint chk_nisn_or_reason check (nisn is not null or nullif(trim(catatan), '') is not null)
);
comment on table biodata_siswa is 'Data siswa, dipisah dari form_pendaftaran (1:1) agar struktur lebih fleksibel.';

-- ---------------------------------------------------------
-- biodata_siswa_detail
-- ---------------------------------------------------------
create table biodata_siswa_detail (
    id                  uuid primary key default gen_random_uuid(),
    biodata_siswa_id    uuid references biodata_siswa(id) unique not null on delete cascade,
    anak_ke             int check (anak_ke >= 1),
    jumlah_saudara      int check (jumlah_saudara >= 0),
    alamat              text,                                  -- alamat siswa, boleh beda dgn alamat keluarga
    tinggal_bersama_id  smallint references master_tinggal_bersama(id),
    status_rumah_id     smallint references master_status_rumah(id),
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now()
);
comment on table biodata_siswa_detail is 'Data siswa detail, dipisah dari biodata_siswa (1:1) agar struktur lebih fleksibel.';

-- ---------------------------------------------------------
-- biodata_keluarga
-- ---------------------------------------------------------
create table biodata_keluarga (
    id                    uuid primary key default gen_random_uuid(),
    biodata_siswa_id      uuid references biodata_siswa(id) not null on delete cascade,
    relation_type         family_relation_enum not null,   -- AYAH, IBU, WALI
    detail_relation_type  varchar(50),                      -- detail WALI, mis. Kakek/Paman
    nama_lengkap          varchar(150) not null,
    nik                   varchar(16) unique not null check (nik ~ '^[0-9]{16}$'),
    status_hidup          life_status_enum not null default 'HIDUP',
    tempat_lahir          varchar(100),
    tanggal_lahir         date,
    pekerjaan             varchar(100),
    pendidikan_terakhir   varchar(50),
    no_hp                 varchar(20) not null,
    alamat                text,
    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now(),
    constraint uq_siswa_relation unique (biodata_siswa_id, relation_type),
    constraint chk_wali_data check ( relation_type <> 'WALI' or (relation_type='WALI' and status_hidup='HIDUP' and detail_relation_type is not null))
);
comment on table biodata_keluarga is
    'Satu tabel untuk AYAH/IBU/WALI dibedakan relation_type (hindari duplikasi struktur). '
    'Validasi "AYAH & IBU wajib ada" dan "WALI wajib jika AYAH/IBU MENINGGAL" ditegakkan via function (functions/bisnis), bukan constraint statis.';

-- ---------------------------------------------------------
-- pendidikan_siswa_sebelumnya
-- ---------------------------------------------------------
create table pendidikan_siswa_sebelumnya (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid references biodata_siswa(id) unique not null on delete cascade,
    nama_sekolah         varchar(150),
    npsn                 varchar(20),
    alamat_sekolah       text,
    tahun_lulus          smallint check (tahun_lulus between 1900 and 2100),
    nilai_rata_rata      numeric(5,2) check (nilai_rata_rata between 0 and 100),
    catatan              text, -- belum pernah sekolah
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now(),
    constraint chk_school_or_note
    check (
        (
            nama_sekolah is not null
            and npsn is not null
            and alamat_sekolah is not null
            and tahun_lulus is not null
            and nilai_rata_rata is not null
        )
        or
        (
            nullif(trim(catatan), '') is not null
        )
    )
);
comment on table pendidikan_siswa_sebelumnya is
'Riwayat pendidikan siswa sebelumnya (1:1 dengan biodata_siswa).';

-- ---------------------------------------------------------
-- form_pendaftaran
-- ---------------------------------------------------------
create table form_pendaftaran (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid references biodata_siswa(id) not null on delete cascade,
    tahun_ajaran_id      smallint not null references master_tahun_ajaran(id) on delete restrict,
    step_id              smallint references master_step(id) on delete set null,
    registration_status  registration_form_status_enum not null default 'DRAFT',
    admission_status     admission_status_enum    not null default 'PROCESS',
    finalized_at         timestamptz,
    decided_at           timestamptz,        -- tambahan: jejak kapan keputusan dibuat
    decided_by           uuid references profiles(id),  -- tambahan: ADMINISTRATOR yang memutuskan
    created_by uuid references profiles(id),
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now(),
    constraint uq_siswa_tahun_ajaran unique (biodata_siswa_id, tahun_ajaran_id)
);
comment on table form_pendaftaran is
    'Formulir pendaftaran. owner_user_id TIDAK unique (1 akun bisa banyak pendaftaran). '
    'payment_status TIDAK disimpan di sini, melainkan di tabel pembayaran (status independen).';

-- ---------------------------------------------------------
-- pembayaran  (NOTE #7)
-- ---------------------------------------------------------
create table pembayaran (
    id                   uuid primary key default gen_random_uuid(),
    form_pendaftaran_id  uuid unique not null references form_pendaftaran(id) on delete cascade,
    payment_type          varchar(30) not null default 'FORMULIR',  -- disiapkan utk jenis pembayaran lain di masa depan
    nominal               numeric(14,2) check (nominal >= 0),
    tanggal_transfer      timestamptz,         -- default waktu upload, bisa diubah admin
    bank_tujuan           varchar(100),
    nama_pengirim         varchar(150),        -- diisi admin berdasar bukti transfer
    bukti_pembayaran_url  text,
    payment_status         payment_status_enum not null default 'SUBMITTED',
    catatan_verifikasi     text,
    verified_by            uuid references profiles(id),
    verified_at            timestamptz,
    created_at             timestamptz not null default now(),
    updated_at             timestamptz not null default now()
);
comment on table pembayaran is 'Satu pembayaran aktif per pendaftaran. Upload ulang mengganti file, riwayat tidak disimpan.';

-- ---------------------------------------------------------
-- dokumen  (NOTE #6)
-- ---------------------------------------------------------
create table dokumen (
    id                   uuid primary key default gen_random_uuid(),
    form_pendaftaran_id  uuid not null references form_pendaftaran(id) on delete cascade,
    tipe_dokumen_id      smallint not null references master_tipe_dokumen(id) on delete restrict,
    file_url             text not null,
    document_status      document_status_enum not null default 'SUBMITTED',
    catatan_verifikasi    text,
    verified_by           uuid references profiles(id),
    verified_at           timestamptz,
    uploaded_at           timestamptz not null default now(),
    created_at            timestamptz not null default now(),
    updated_at             timestamptz not null default now(),
    constraint uq_form_tipe_dokumen unique (form_pendaftaran_id, tipe_dokumen_id)
);
comment on table dokumen is 'Satu tipe dokumen = satu file aktif per pendaftaran. Upload ulang mengganti file, riwayat tidak disimpan.';

-- KEEP:

CREATE UNIQUE INDEX uq_active_step_code ON master_step(code) WHERE (is_active = true);
CREATE UNIQUE INDEX uq_active_step_order ON master_step(step_order) WHERE (is_active = true);

CREATE INDEX IF NOT EXISTS idx_biodata_owner_user
ON biodata_siswa(owner_user_id);

CREATE INDEX idx_biodata_siswa_reclaim_verify
ON biodata_siswa (nik, tanggal_lahir, no_kk);

CREATE INDEX IF NOT EXISTS idx_pendidikan_siswa
ON pendidikan_siswa_sebelumnya(biodata_siswa_id);

CREATE INDEX IF NOT EXISTS idx_keluarga_siswa
ON biodata_keluarga(biodata_siswa_id);

CREATE INDEX IF NOT EXISTS idx_dokumen_form
ON dokumen(form_pendaftaran_id);

CREATE INDEX IF NOT EXISTS idx_form_created_by
ON form_pendaftaran(created_by);

-- post 

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

CREATE UNIQUE INDEX idx_categories_slug_lower
ON categories (lower(slug));

-- reclaim 

CREATE INDEX IF NOT EXISTS idx_owner_history_siswa
ON biodata_siswa_owner_history(biodata_siswa_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_new_owner
ON biodata_siswa_owner_history(new_owner_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_changed_at
ON biodata_siswa_owner_history(changed_at DESC);

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

-- audit trail & activity logs

CREATE INDEX IF NOT EXISTS idx_activity_created_at
ON activity_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_created_at
ON audit_trail(created_at DESC);