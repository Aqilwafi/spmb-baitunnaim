-- ============================================================
-- File   : other/enums_type.sql
-- Purpose: Custom ENUM types.
--          Hanya untuk nilai TETAP / fixed lifecycle (bukan
--          master data yang bisa ditambah admin -> itu pakai
--          tabel master_*).
-- Depends: -
-- ============================================================

-- Jenis kelamin
create type gender_enum as enum (
    'MALE',
    'FEMALE',
    'OTHER'
);

-- Status hidup orang tua / wali (NOTE #5)
create type life_status_enum as enum (
    'HIDUP',
    'MENINGGAL',
    'LAINNYA'
);

-- Tipe relasi keluarga (NOTE #5)
create type family_relation_enum as enum (
    'AYAH',
    'IBU',
    'WALI'
);

-- Status kelengkapan formulir pendaftaran (NOTE #4)
create type registration_form_status_enum as enum (
    'DRAFT',
    'FINALIZED'
);

-- Status keputusan akhir pendaftaran (NOTE #4 / #8)
create type admission_status_enum as enum (
    'PROCESS', 
    'AWAITING',
    'ACCEPTED',
    'REJECTED'
);

create type semester_enum as enum (
    'GANJIL', 
    'GENAP'
);

-- Status pembayaran (NOTE #4 / #7)
create type payment_status_enum as enum (
    'PENDING',
    'SUBMITTED',
    'VERIFIED',
    'REJECTED'
);

-- Status verifikasi dokumen (NOTE #6)
create type document_status_enum as enum (
    'PENDING',
    'SUBMITTED',
    'VERIFIED',
    'REJECTED'
);

-- Jenis operasi pada audit trail (NOTE #9)
create type audit_operation_enum as enum (
    'INSERT',
    'UPDATE',
    'SOFT_DELETE'
    'DELETE'
);