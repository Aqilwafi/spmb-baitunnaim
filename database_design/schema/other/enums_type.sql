-- ============================================================
-- file   : other/enums_type.sql
-- purpose: custom enum types.
--          hanya untuk nilai tetap / fixed lifecycle (bukan
--          master data yang bisa ditambah admin -> itu pakai
--          tabel master_*).
-- depends: -
-- ============================================================

do $$
begin
    -- 1. jenis kelamin
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'gender_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.gender_enum as enum ('MALE', 'FEMALE', 'OTHER');
    end if;

    -- 2. status hidup orang tua / wali
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'life_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.life_status_enum as enum ('HIDUP', 'MENINGGAL', 'LAINNYA');
    end if;

    -- 3. tipe relasi keluarga
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'family_relation_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.family_relation_enum as enum ('AYAH', 'IBU', 'WALI');
    end if;

    -- 4. status kelengkapan formulir pendaftaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'registration_form_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.registration_form_status_enum as enum ('DRAFT', 'FINALIZED');
    end if;

    -- 5. status keputusan akhir pendaftaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'admission_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.admission_status_enum as enum ('PROCESS', 'AWAITING', 'ACCEPTED', 'REJECTED');
    end if;

    -- 6. semester
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'semester_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.semester_enum as enum ('GANJIL', 'GENAP');
    end if;

    -- 7. status pembayaran
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'payment_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.payment_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 8. status verifikasi dokumen
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'document_status_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.document_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 9. status publikasi postingan
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'post_status' 
          and nsp.nspname = 'public'
    ) then
        create type public.post_status as enum ('DRAFT', 'PUBLISHED');
    end if;

    -- 10. jenis operasi pada audit trail
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'audit_operation_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.audit_operation_enum as enum ('INSERT', 'UPDATE', 'SOFT_DELETE', 'DELETE');
    end if;

    -- 11. agama
    if not exists (
        select 1 
        from pg_type n
        join pg_namespace nsp on nsp.oid = n.typnamespace
        where n.typname = 'agama_enum' 
          and nsp.nspname = 'public'
    ) then
        create type public.agama_enum as enum ('ISLAM', 'KRISTEN', 'KATOLIK', 'BUDHA', 'HINDU', 'KONGHUCHU');
    end if;
    

end $$;