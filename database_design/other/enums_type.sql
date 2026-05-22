
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('L', 'P');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hubungan_enum') THEN
        CREATE TYPE hubungan_enum AS ENUM ('AYAH', 'IBU', 'WALI');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'semester_enum') THEN
        CREATE TYPE semester_enum AS ENUM ('GANJIL', 'GENAP');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_validasi_enum') THEN
        CREATE TYPE status_validasi_enum AS ENUM ('PENDING', 'APPROVED', 'REVISION_REQUIRED');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pendidikan_keluarga_enum') THEN
        CREATE TYPE pendidikan_keluarga_enum AS ENUM ('SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3', 'LAINNYA');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nik_type') THEN
        CREATE DOMAIN nik_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{16}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nisn_type') THEN
        CREATE DOMAIN nisn_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{10}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'npsn_type') THEN
        CREATE DOMAIN npsn_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{8}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kk_type') THEN
        CREATE DOMAIN kk_type AS TEXT
        CHECK (VALUE ~ '^[0-9]{16}$' OR VALUE IS NULL);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'phone_number') THEN
        CREATE DOMAIN phone_number AS TEXT
        CHECK (VALUE ~ E'^\\+[1-9][0-9]{7,14}$' OR VALUE IS NULL);
    END IF;
END $$;