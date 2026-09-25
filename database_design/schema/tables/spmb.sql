-- ---------------------------------------------------------
-- form_pendaftaran
-- ---------------------------------------------------------
create table if not exists form_pendaftaran (
    id                   uuid primary key default gen_random_uuid(),
    biodata_siswa_id     uuid not null references public.biodata_siswa(id) on delete cascade,
    pendaftar_id         uuid references public.profiles(id),
    tahun_ajaran_id      smallint not null references public.master_tahun_ajaran(id) on delete restrict,
    step_id              smallint references public.master_step(id) on delete set null,
    registration_status  registration_form_status_enum not null default 'DRAFT',
    admission_status     admission_status_enum    not null default 'PROCESS',
    finalized_by         uuid references public.profiles(id),
    finalized_at         timestamptz,
    decided_by           uuid references public.profiles(id),  
    decided_at           timestamptz,   
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now(),
    deleted_at           timestamptz,
    constraint uq_siswa_tahun_ajaran unique (biodata_siswa_id, tahun_ajaran_id),
    constraint chk_finalization_time check (finalized_at >= created_at),
    constraint chk_decided_time check (decided_at >= created_at)
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
    bukti_pembayaran_url  text not null,
    payment_status         payment_status_e num not null default 'SUBMITTED',
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
    updated_at            timestamptz not null default now(),
    deleted_at           timestamptz,
    constraint uq_form_tipe_dokumen unique (form_pendaftaran_id, tipe_dokumen_id)
);
comment on table public.dokumen is 'Satu tipe dokumen = satu file aktif per pendaftaran. Upload ulang mengganti file, riwayat tidak disimpan.';
