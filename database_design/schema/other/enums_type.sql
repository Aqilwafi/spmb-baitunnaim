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
    if not exists (select 1 from pg_type where typname = 'gender_enum') then
        create type gender_enum as enum ('MALE', 'FEMALE', 'OTHER');
    end if;

    -- 2. status hidup orang tua / wali
    if not exists (select 1 from pg_type where typname = 'life_status_enum') then
        create type life_status_enum as enum ('HIDUP', 'MENINGGAL', 'LAINNYA');
    end if;

    -- 3. tipe relasi keluarga
    if not exists (select 1 from pg_type where typname = 'family_relation_enum') then
        create type family_relation_enum as enum ('AYAH', 'IBU', 'WALI');
    end if;

    -- 4. status kelengkapan formulir pendaftaran
    if not exists (select 1 from pg_type where typname = 'registration_form_status_enum') then
        create type registration_form_status_enum as enum ('DRAFT', 'FINALIZED');
    end if;

    -- 5. status keputusan akhir pendaftaran
    if not exists (select 1 from pg_type where typname = 'admission_status_enum') then
        create type admission_status_enum as enum ('PROCESS', 'AWAITING', 'ACCEPTED', 'REJECTED');
    end if;

    -- 6. semester
    if not exists (select 1 from pg_type where typname = 'semester_enum') then
        create type semester_enum as enum ('GANJIL', 'GENAP');
    end if;

    -- 7. status pembayaran
    if not exists (select 1 from pg_type where typname = 'payment_status_enum') then
        create type payment_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 8. status verifikasi dokumen
    if not exists (select 1 from pg_type where typname = 'document_status_enum') then
        create type document_status_enum as enum ('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED');
    end if;

    -- 9. jenis operasi pada audit trail
    if not exists (select 1 from pg_type where typname = 'audit_operation_enum') then
        create type audit_operation_enum as enum ('INSERT', 'UPDATE', 'SOFT_DELETE', 'DELETE');
    end if;

    if not exists (select 1 from pg_type where typname = 'post_status') then
        create type post_status as enum ('DRAFT', 'PUBLISHED');
    end if;

end $$;