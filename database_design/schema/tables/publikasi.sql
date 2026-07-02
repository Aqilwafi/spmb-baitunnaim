-- ==========================================
-- 2. tabel tag
-- ==========================================
create table if not exists tags (
    id bigint generated always as identity primary key,
    label varchar(50) not null unique,
    is_active boolean default true
);

-- ==========================================
-- 3. tabel utama artikel
-- ==========================================
create table if not exists posts (
    id bigint generated always as identity primary key,
    lembaga_id smallint references master_lembaga(id) on delete set null,
    category_id smallint references master_categories(id) on delete set null,
    penulis varchar(255) not null,
    judul varchar(255) not null,
    slug varchar(255) not null unique,
    ringkasan varchar(255),
    content text not null,
    status post_status default 'draft', -- disesuaikan ke lowercase sesuai enum
    is_active boolean default true,
    created_by uuid references profiles(id) on delete set null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ==========================================
-- 4. tabel jembatan artikel dan tag
-- ==========================================
create table if not exists post_tag (
    post_id bigint not null,
    tag_id bigint not null,
    primary key (post_id, tag_id),
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (tag_id) references tags(id) on delete cascade
);