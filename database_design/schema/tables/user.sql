-- ---------------------------------------------------------
-- profiles
-- ---------------------------------------------------------

create table if not exists public.profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    account_name varchar(150),
    phone       varchar(20),
    avatar_url  text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);
comment on table profiles is 'Profil pengguna, 1:1 dengan auth.users. Disinkronkan via functions/auth.';

create table if not exists public.valid_role_domains (
    role_id     smallint not null references master_roles(id) on delete restrict,
    domain_id   smallint not null references master_domains(id) on delete restrict,
    primary key (role_id, domain_id)
);

create table if not exists public.user_roles (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references public.profiles(id) on delete cascade,
    role_id     smallint not null,
    domain_id   smallint not null,
    is_active   boolean     not null default true,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now(),
    constraint uq_user_role_domain unique (user_id, role_id, domain_id),
    constraint fk_user_roles_business_matrix
        foreign key (role_id, domain_id) 
        references public.valid_role_domains(role_id, domain_id)
        on update cascade
);
comment on table public.user_roles is 'Pemetaan role per user per domain. Contoh: Ahmad = VERIFIKATOR@SPMB, PUBLIKATOR@PUBLIKASI.';

-- Masukkan daftar kombinasi yang sah sesuai list kamu:
insert into public.valid_role_domains (role_id, domain_id) values
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(4, 1),
(5, 2);