-- ---------------------------------------------------------
-- profiles
-- ---------------------------------------------------------
create table if not exists profiles (
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
create table if not exists user_roles (
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
