
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
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now()
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
    code  varchar(30) not null unique,
    label varchar(50) not null,
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
    code        varchar(30)  not null unique check (code = upper(code)),
    label       varchar(100) not null,
    description text,
    is_active   boolean      not null default true,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz  not null default now(),
    constraint uq_step_order_active unique (step_order, is_active)
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
    code        varchar(30)  not null unique,
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
    code,
    label,
    step_order
)
values
    ('FORM', 'Buat Form', 1),
    ('PAYMENT', 'Pembayaran', 2),
    ('BIODATA_STUDENT', 'Biodata Siswa', 3),
    ('BIODATA_FATHER', 'Biodata Ayah', 4),
    ('BIODATA_MOTHER', 'Biodata Ibu', 5),
    ('BIODATA_WALI', 'Biodata Wali', 6),
    ('DOCUMENT_KK', 'Dokumen KK', 7),
    ('DOCUMENT_KTP', 'Dokumen KTP', 8),
    ('DOCUMENT_AKTE', 'Dokumen AKTE', 9),
    ('FINALIZATION', 'Finalisasi', 10)
on conflict (code)
do update set
    label = excluded.label,
    step_order = excluded.step_order;

insert into master_lembaga (code, label) values
    ('MI', 'MI'),
    ('TK', 'TK'),
    ('KB', 'KB'),
    ('TPA', 'TPA')
on conflict (code) do nothing;

insert into master_kelas (code, label) values
    ('MI01', 'Kelas 1'),
    ('MI02', 'Kelas 2'),
    ('MI03', 'Kelas 3'),
    ('MI04', 'Kelas 4'),
    ('MI05', 'Kelas 5'),
    ('MI06', 'Kelas 6')
on conflict (code) do nothing;

insert into master_tahun_ajaran (
    code,
    label,
    start_year,
    end_year,
    semester,
    is_active
)
values
    ('2025-2026_GENAP', '2025-2026_GENAP', 2025, 2026, 'GENAP', false),
    ('2026-2027_GANJIL', '2025-2026_GENAP', 2026, 2027, 'GANJIL', true),
    ('2026-2027_GENAP', '2025-2026_GENAP', 2026, 2027, 'GENAP', false)
on conflict (start_year, end_year, semester) do nothing;

insert into master_tipe_dokumen (code, label) values
    ('KK_TYPE_DOC', 'Kartu Keluarga'),
    ('KTP_TYPE_DOC', 'Kartu Tanda Penduduk'),
    ('AKTE_TYPE_DOC', 'Akte Kelahiran')
on conflict (code) do nothing;

insert into master_status_rumah (code, label) values
    ('NENEK', 'Nenek'),
    ('ORTU', 'Orang Tua'),
    ('SAUDARA', 'Saudara'),
    ('DINAS', 'Dinas'),
    ('SEWA', 'Sewa/Kontrak')
on conflict (code) do nothing;

insert into master_tinggal_bersama (code, label) values
    ('ORTU', 'Orang Tua'),
    ('SAUDARA', 'Saudara'),
    ('WALI', 'Wali'),
    ('PANTI', 'Panti'),
    ('PESANTREN', 'Pesantren')
on conflict (code) do nothing;


create or replace function public.fn_generate_tahun_ajaran_metadata()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.code :=
        new.start_year::text
        || '-'
        || new.end_year::text
        || '_'
        || new.semester::text;

    new.label :=
        new.start_year::text
        || '/'
        || new.end_year::text
        || ' - '
        || initcap(lower(new.semester::text));

    return new;
end;
$$;


drop trigger if exists tr_generate_tahun_ajaran_metadata
on public.master_tahun_ajaran;

create trigger tr_generate_tahun_ajaran_metadata
before insert or update of start_year, end_year, semester
on public.master_tahun_ajaran
for each row
execute function public.fn_generate_tahun_ajaran_metadata();