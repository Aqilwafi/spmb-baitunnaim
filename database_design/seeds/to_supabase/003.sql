
create or replace function public.fn_can_manage_spmb()
returns boolean
language sql
stable
set search_path = public
as $$
    select (
        public.fn_is_high_level_admin() 
        or
        coalesce(
            (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[4]'::jsonb, false
        )
    ); 
$$;

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