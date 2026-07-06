
-- ---------------------------------------------------------
-- biodata_siswa
-- ---------------------------------------------------------
create table if not exists public.biodata_siswa (
    id                  uuid primary key default gen_random_uuid(),
    owner_user_id       uuid references public.profiles(id) not null on delete restrict,
    nik                 public.dom_nik unique not null,
    nisn                public.dom_nisn unique,
    no_kk               public.dom_kk not null,
    nama_lengkap        varchar(255) not null,
    tempat_lahir        varchar(255) not null,
    tanggal_lahir       date not null,
    jenis_kelamin       gender_enum  not null,
    lembaga_id          smallint not null references public.master_lembaga(id) on delete restrict,
    kelas_id            smallint references public.master_kelas(id) on delete restrict,
    catatan             text,
    deleted_at          timestamptz,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now(),
    constraint chk_nisn_or_reason check (nisn is not null or nullif(trim(catatan), '') is not null)
);
comment on table public.biodata_siswa is 'Data siswa, dipisah dari form_pendaftaran (1:1) agar struktur lebih fleksibel.';

-- ---------------------------------------------------------
-- biodata_siswa_detail
-- ---------------------------------------------------------
create table if not exists public.biodata_siswa_detail (
    id                  uuid primary key references public.biodata_siswa(id) not null on delete cascade,
    anak_ke             int check (anak_ke >= 1),
    jumlah_saudara      int check (jumlah_saudara >= 0),
    alamat              text,                                  -- alamat siswa, boleh beda dgn alamat keluarga
    tinggal_bersama_id  smallint references public.master_tinggal_bersama(id),
    status_rumah_id     smallint references public.master_status_rumah(id),
    deleted_at          timestamptz,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now()
);
comment on table public.biodata_siswa_detail is 'Data siswa detail, dipisah dari biodata_siswa (1:1) agar struktur lebih fleksibel.';

-- ---------------------------------------------------------
-- biodata_keluarga
-- ---------------------------------------------------------
create table if not exists public.biodata_keluarga (
    id                    uuid primary key default gen_random_uuid(),
    biodata_siswa_id      uuid references public.biodata_siswa(id) not null on delete cascade,
    relation_type         family_relation_enum not null,   -- AYAH, IBU, WALI
    detail_relation_type  varchar(50),                      -- detail WALI, mis. Kakek/Paman
    nama_lengkap          varchar(150) not null,
    nik                   public.dom_nik unique not null,
    status_hidup          life_status_enum not null default 'HIDUP',
    tempat_lahir          varchar(100),
    tanggal_lahir         date,
    pekerjaan             varchar(100),
    pendidikan_terakhir   varchar(50),
    no_hp                 public.dom_nomor_hp not null,
    alamat                text,
    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now(),
    deleted_at           timestamptz,
    constraint uq_siswa_relation unique (biodata_siswa_id, relation_type),
    constraint chk_wali_data check ( relation_type <> 'WALI' or (relation_type='WALI' and status_hidup='HIDUP' and detail_relation_type is not null))
);
comment on table public.biodata_keluarga is
    'Satu tabel untuk AYAH/IBU/WALI dibedakan relation_type (hindari duplikasi struktur). '
    'Validasi "AYAH & IBU wajib ada" dan "WALI wajib jika AYAH/IBU MENINGGAL" ditegakkan via function (functions/bisnis), bukan constraint statis.';

-- ---------------------------------------------------------
-- pendidikan_siswa_sebelumnya
-- ---------------------------------------------------------
create table if not exists public.pendidikan_siswa_sebelumnya (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid references public.biodata_siswa(id) unique not null on delete cascade,
    nama_sekolah         varchar(150),
    npsn                 public.dom_npsn,
    alamat_sekolah       text,
    tahun_lulus          smallint check (tahun_lulus between 1900 and 2100),
    nilai_rata_rata      numeric(5,2) check (nilai_rata_rata between 0 and 100),
    catatan              text default null, -- belum pernah sekolah
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now(),
    deleted_at           timestamptz,
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
comment on table public.pendidikan_siswa_sebelumnya is
'Riwayat pendidikan siswa sebelumnya (1:1 dengan biodata_siswa).';

-- ---------------------------------------------------------
-- form_pendaftaran
-- ---------------------------------------------------------
create table if not exists form_pendaftaran (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid references public.biodata_siswa(id) not null on delete cascade,
    tahun_ajaran_id      smallint not null references public.master_tahun_ajaran(id) on delete restrict,
    step_id              smallint references public.master_step(id) on delete set null,
    registration_status  registration_form_status_enum not null default 'DRAFT',
    admission_status     admission_status_enum    not null default 'PROCESS',
    finalized_at         timestamptz,
    decided_at           timestamptz,        -- tambahan: jejak kapan keputusan dibuat
    decided_by           uuid references public.profiles(id),  -- tambahan: ADMINISTRATOR yang memutuskan
    created_by uuid references public.profiles(id),
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now(),
    deleted_at           timestamptz,
    constraint uq_siswa_tahun_ajaran unique (biodata_siswa_id, tahun_ajaran_id)
);
comment on table public.form_pendaftaran is
    'Formulir pendaftaran. owner_user_id TIDAK unique (1 akun bisa banyak pendaftaran). '
    'payment_status TIDAK disimpan di sini, melainkan di tabel pembayaran (status independen).';

-- ---------------------------------------------------------
-- pembayaran  (NOTE #7)
-- ---------------------------------------------------------
create table if not exists public.pembayaran (
    id                   uuid primary key references public.form_pendaftaran(id) on delete cascade,
    payment_type          varchar(30) not null default 'FORMULIR',  -- disiapkan utk jenis pembayaran lain di masa depan
    nominal               numeric(14,2) check (nominal >= 0),
    tanggal_transfer      timestamptz,         -- default waktu upload, bisa diubah admin
    bank_tujuan           varchar(100),
    nama_pengirim         varchar(150),        -- diisi admin berdasar bukti transfer
    bukti_pembayaran_url  text,
    payment_status         payment_status_enum not null default 'SUBMITTED',
    catatan_verifikasi     text,
    verified_by            uuid references public.profiles(id),
    verified_at            timestamptz,
    created_at             timestamptz not null default now(),
    updated_at             timestamptz not null default now(),
    deleted_at           timestamptz
);
comment on table public.pembayaran is 'Satu pembayaran aktif per pendaftaran. Upload ulang mengganti file, riwayat tidak disimpan.';

-- ---------------------------------------------------------
-- dokumen  (NOTE #6)
-- ---------------------------------------------------------
create table if not exists public.dokumen (
    id                   uuid primary key default gen_random_uuid(),
    form_pendaftaran_id  uuid not null references public.form_pendaftaran(id) on delete cascade,
    tipe_dokumen_id      smallint not null references public.master_tipe_dokumen(id) on delete restrict,
    file_url             text not null,
    document_status      document_status_enum not null default 'SUBMITTED',
    catatan_verifikasi    text default null,
    verified_by           uuid references public.profiles(id),
    verified_at           timestamptz,
    uploaded_at           timestamptz not null default now(),
    created_at            timestamptz not null default now(),
    updated_at             timestamptz not null default now(),
    deleted_at           timestamptz,
    constraint uq_form_tipe_dokumen unique (form_pendaftaran_id, tipe_dokumen_id)
);
comment on table public.dokumen is 'Satu tipe dokumen = satu file aktif per pendaftaran. Upload ulang mengganti file, riwayat tidak disimpan.';
