CREATE OR REPLACE FUNCTION public.check_wali_required()
RETURNS TRIGGER AS $$
DECLARE
    ayah_hidup BOOLEAN;
    ibu_hidup BOOLEAN;
    wali_exists BOOLEAN;
BEGIN

    SELECT
        MAX(CASE WHEN hubungan = 'AYAH' THEN status_hidup END),
        MAX(CASE WHEN hubungan = 'IBU' THEN status_hidup END)
    INTO ayah_hidup, ibu_hidup
    FROM biodata_keluarga
    WHERE siswa_id = NEW.siswa_id;

    SELECT EXISTS (
        SELECT 1 
        FROM biodata_keluarga 
        WHERE siswa_id = NEW.siswa_id 
          AND hubungan = 'WALI'
    ) INTO wali_exists;

    -- normalize NULL → FALSE fallback safety
    ayah_hidup := COALESCE(ayah_hidup, TRUE);
    ibu_hidup := COALESCE(ibu_hidup, TRUE);

    -- RULE: wali wajib jika ayah & ibu meninggal
    IF ayah_hidup = FALSE 
       AND ibu_hidup = FALSE 
       AND wali_exists = FALSE THEN
        RAISE EXCEPTION 'Wali wajib ada jika ayah dan ibu sudah meninggal';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trg_check_wali_required ON biodata_keluarga;

CREATE TRIGGER trg_check_wali_required
AFTER INSERT OR UPDATE ON biodata_keluarga
FOR EACH ROW
EXECUTE FUNCTION public.check_wali_required();