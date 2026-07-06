-- ============================================================
-- file   : other/extensions_and_domains.sql
-- purpose: postgresql extensions & custom domains untuk ppdb.
-- order  : jalankan paling pertama, sebelum table & enum.
-- depends: -
-- ============================================================

-- aktifkan ekstensi pgcrypto untuk kebutuhan uuid jika belum ada
create extension if not exists "pgcrypto";

do $$
begin
    -- 1. format nik: wajib berupa angka dan tepat 16 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nik' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nik as text
        check (
            value ~ '^[0-9]{16}$'
        );
    end if;

    -- 2. format nomor kartu keluarga (kk): wajib berupa angka dan tepat 16 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_kk' and nsp.nspname = 'public'
    ) then
        create domain public.dom_kk as text
        check (
            value ~ '^[0-9]{16}$'
        );
    end if;

    -- 3. format nisn: wajib berupa angka dan tepat 10 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nisn' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nisn as text
        check (
            value ~ '^[0-9]{10}$'
        );
    end if;

    -- 4. format nomor handphone indonesia
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_nomor_hp' and nsp.nspname = 'public'
    ) then
        create domain public.dom_nomor_hp as text
        check (
            value ~ '^(08|\+628|628)[0-9]{9,13}$'
        );
    end if;

    -- 5. format npsn: wajib alfanumerik (atau angka) dan tepat 8 digit
    if not exists (
        select 1 from pg_type n join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'dom_npsn' and nsp.nspname = 'public'
    ) then
        create domain public.dom_npsn as text
        check (
            value ~ '^[a-zA-r0-9]{8}$'
        );
    end if;

end $$;