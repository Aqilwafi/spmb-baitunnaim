create table if not exists public.pages (
    id bigint generated always as identity primary key,
    master_lembaga_id bigint references public.master_lembaga(id) on delete cascade,
    code varchar(100) not null,
    judul varchar(255) not null,
    slug varchar(255) not null,
    content text not null,
    cover_image_url text,
    meta_title varchar(255),
    meta_description text,
    sort_order integer not null default 0,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint uq_pages_lembaga_code unique (master_lembaga_id, code),
    constraint uq_pages_lembaga_slug unique (master_lembaga_id, slug)
);

create table if not exists public.kata_mereka (
    id bigint generated always as identity primary key,
    oleh varchar(255) not null,
    content text not null,
    avatar_url text,
    sort_order integer not null default 0,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.kerjasama (
    id bigint generated always as identity primary key,
    nama varchar(255) not null,
    image_url text not null,
    deskripsi text,
    sort_order integer not null default 0,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.sosial_media (
    id smallint generated always as identity primary key,
    code varchar(50) not null unique,
    nama varchar(100) not null,
    link text not null,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.faq (
    id bigint generated always as identity primary key,
    question text not null,
    answer text not null,
    sort_order integer not null default 0,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.hero_banners (
    id bigint generated always as identity primary key,
    judul varchar(255) not null,
    subjudul text,
    image_url text not null,
    button_label varchar(100),
    button_link text,
    sort_order integer not null default 0,
    is_show boolean not null default true,
    is_active boolean not null default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
    setting_key varchar(100) primary key,
    setting_value text not null,
    description text,
    updated_by uuid references public.profiles(id) on delete set null,
    updated_at timestamptz not null default now()
);