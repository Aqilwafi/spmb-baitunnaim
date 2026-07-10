
create or replace function public.fn_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

-- users table

drop trigger if exists trg_set_updated_at
on public.profiles;

create trigger trg_set_updated_at
before update on public.profiles
for each row
execute function public.fn_set_updated_at();

drop trigger if exists trg_set_updated_at
on public.user_roles;

create trigger trg_set_updated_at
before update on public.user_roles
for each row
execute function public.fn_set_updated_at();

-- ---------------------------------------------------------
-- master_lembaga
-- ---------------------------------------------------------
create table if not exists master_lembaga (
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
create table if not exists master_kelas (
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
create table if not exists master_tahun_ajaran (
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
create table if not exists master_step (
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
create table if not exists master_tipe_dokumen (
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
create table if not exists master_status_rumah (
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
create table if not exists master_tinggal_bersama (
    id          smallint     primary key generated always as identity,
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
);

comment on table master_tinggal_bersama is
'Living arrangement of the student.';

create table if not exists master_categories (
    id smallint generated always as identity primary key,
    label varchar(100) not null,
    is_active boolean not null default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()

);

insert into master_step (
    id,
    code,
    label,
    sort_order,
    is_revisable
)
values
    (1, 'FORM', 'Buat Form', 1, false),
    (2, 'PAYMENT', 'Pembayaran', 2, true),
    (3, 'BIODATA_STUDENT', 'Biodata Siswa', 3, true),
    (4, 'BIODATA_FATHER', 'Biodata Ayah', 4, true),
    (5, 'BIODATA_MOTHER', 'Biodata Ibu', 5, true),
    (6, 'BIODATA_WALI', 'Biodata Wali', 6, true),
    (7, 'DOCUMENT_KK', 'Dokumen KK', 7, true),
    (8, 'DOCUMENT_KTP', 'Dokumen KTP', 8, true),
    (9, 'DOCUMENT_AKTE', 'Dokumen AKTE', 9, true),
    (10, 'FINALIZATION', 'Finalisasi', 10, false)
on conflict (code)
do update set
    label = excluded.label,
    sort_order = excluded.sort_order,
    is_revisable = excluded.is_revisable;

insert into master_lembaga (id, code, label) values
    (1, 'MI', 'MI'),
    (2, 'TK', 'TK'),
    (3, 'KB', 'KB'),
    (4, 'TPA', 'TPA')
on conflict (label) do nothing;

insert into master_kelas (id, code, label) values
    (1, 'MI01', 'Kelas 1'),
    (2, 'MI02', 'Kelas 2'),
    (3, 'MI03', 'Kelas 3'),
    (4, 'MI04', 'Kelas 4'),
    (5, 'MI05', 'Kelas 5'),
    (6, 'MI06', 'Kelas 6')
on conflict (label) do nothing;

insert into master_tahun_ajaran (code, tahun_mulai, tahun_selesai, semester, is_active) values
    ('2025-2', 2025, 2026, 'GENAP', false),
    ('2026-1', 2026, 2027, 'GANJIL', true),
    ('2026-2', 2026, 2027, 'GENAP', false)
on conflict (tahun_mulai, tahun_selesai, semester) do nothing;

insert into master_tipe_dokumen (id, code, label) values
    (1, 'KK_TYPE_DOC', 'Kartu Keluarga'),
    (2, 'KTP_TYPE_DOC', 'Kartu Tanda Penduduk'),
    (3, 'AKTE_TYPE_DOC', 'Akte Kelahiran')
on conflict (code) do nothing;

insert into master_status_rumah (id, code, label) values
    (1, 'NENEK', 'Nenek'),
    (2, 'ORTU', 'Orang Tua'),
    (3, 'SAUDARA', 'Saudara'),
    (4, 'DINAS', 'Dinas'),
    (5, 'SEWA', 'Sewa/Kontrak')
on conflict (code) do nothing;

insert into master_tinggal_bersama (id, code, label) values
    (1, 'ORTU', 'Orang Tua'),
    (2, 'SAUDARA', 'Saudara'),
    (3, 'WALI', 'Wali'),
    (4, 'PANTI', 'Panti'),
    (5, 'PESANTREN', 'Pesantren')
on conflict (code) do nothing;