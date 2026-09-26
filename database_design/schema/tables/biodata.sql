-- ---------------------------------------------------------
-- biodata_siswa
-- ---------------------------------------------------------
create table if not exists public.biodata_siswa (
    id                  uuid primary key default gen_random_uuid(),
    owner_user_id       uuid not null references public.profiles(id) on delete restrict,
    is_active_siswa boolean default false,
    nik                 public.dom_nik unique not null,
    nisn                public.dom_nisn unique,
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
    id                  uuid primary key references public.biodata_siswa(id) on delete cascade,
    no_kk               public.dom_kk not null,
    agama               public.agama_enum not null default 'ISLAM',
    anak_ke             int not null check (anak_ke >= 1),
    jumlah_saudara      int not null check (jumlah_saudara >= 0),
    hobi                varchar(100) not null,
    cita_cita           varchar(100) not null,
    penyakit            text,
    alamat              text not null,                                  -- alamat siswa, boleh beda dgn alamat keluarga
    tinggal_bersama_id  smallint not null references public.master_tinggal_bersama(id),
    status_rumah_id     smallint not null references public.master_status_rumah(id),
    kebutuhan_khusus text,
    disabilitas text,
    no_kip_or_pip text,
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
    biodata_siswa_id      uuid not null references public.biodata_siswa(id) on delete cascade,
    relation_type         family_relation_enum not null,   -- AYAH, IBU, WALI
    detail_relation_type  varchar(50),                     -- detail WALI, mis. Kakek/Paman
    nama_lengkap          varchar(255) not null,
    nik                   public.dom_nik unique,
    status_hidup          life_status_enum not null default 'HIDUP',
    tempat_lahir          varchar(100),
    tanggal_lahir         date,
    pekerjaan             varchar(100),
    pendidikan_terakhir   varchar(50),
    penghasilan           varchar(50),
    no_hp                 public.dom_nomor_hp,
    alamat                text,
    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now(),
    deleted_at            timestamptz,
    constraint uq_siswa_relation unique (biodata_siswa_id, relation_type),
    constraint chk_hidup_require_data check (status_hidup='MENINGGAL'
        or 
        (
            nik is not null and tempat_lahir is not null and tanggal_lahir is not null and
            pekerjaan is not null and pendidikan_terakhir is not null and no_hp is not null and
            penghasilan is not null
        )
    ),
    constraint chk_wali_data check (
        (relation_type <> 'WALI' and detail_relation_type is null)
        or 
        (relation_type = 'WALI' and status_hidup = 'HIDUP' and detail_relation_type is not null)
    )
);
comment on table public.biodata_keluarga is
    'Satu tabel untuk AYAH/IBU/WALI dibedakan relation_type (hindari duplikasi struktur). '
    'Validasi "AYAH & IBU wajib ada" dan "WALI wajib jika AYAH/IBU MENINGGAL" ditegakkan via function (functions/bisnis), bukan constraint statis.';

-- ---------------------------------------------------------
-- pendidikan_siswa_sebelumnya
-- ---------------------------------------------------------
create table if not exists public.pendidikan_siswa_sebelumnya (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid not null unique references public.biodata_siswa(id) on delete cascade,
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
        )
        or
        (
            nullif(trim(catatan), '') is not null
        )
    )
);
comment on table public.pendidikan_siswa_sebelumnya is
'Riwayat pendidikan siswa sebelumnya (1:1 dengan biodata_siswa).';