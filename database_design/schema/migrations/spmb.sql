
-- 1. Set semua data penghasilan yang ada saat ini ke nilai default dummy '1-3 juta'
UPDATE public.biodata_keluarga
SET penghasilan = '1-3 juta'
WHERE penghasilan IS NULL OR penghasilan NOT IN ('<1 juta', '1-3 juta', '3-5 juta', '5-10 juta', '>10 juta');

-- 2. Tambahkan CHECK constraint agar ke depannya kolom penghasilan wajib mengikuti format yang ditentukan
ALTER TABLE public.biodata_keluarga
ADD CONSTRAINT chk_penghasilan_valid 
CHECK (penghasilan IN ('<1 juta', '1-3 juta', '3-5 juta', '5-10 juta', '>10 juta'));

-- 1. Tambah kolom catatan jika belum ada
ALTER TABLE public.biodata_keluarga 
ADD COLUMN IF NOT EXISTS catatan text;

-- 2. Hapus constraint lama yang terlalu ketat
ALTER TABLE public.biodata_keluarga 
DROP CONSTRAINT IF EXISTS chk_hidup_require_data;

-- 3. Pasang constraint baru yang lebih fleksibel (hanya wajibkan yang esensial, atau biarkan null jika masuk catatan)
ALTER TABLE public.biodata_keluarga 
ADD CONSTRAINT chk_hidup_require_data check (
    status_hidup = 'MENINGGAL'
    or 
    (
        tempat_lahir is not null and 
        tanggal_lahir is not null and
        pekerjaan is not null and 
        pendidikan_terakhir is not null and 
        penghasilan is not null
        -- NIK dan No HP sengaja dilepas dari 'not null' ketat agar bisa bernilai null dan masuk ke catatan
    )
);