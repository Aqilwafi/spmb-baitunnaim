CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    -- hanya update jika ada perubahan selain updated_at
    IF to_jsonb(NEW) - 'updated_at'
       IS DISTINCT FROM
       to_jsonb(OLD) - 'updated_at'
    THEN
        NEW.updated_at = NOW();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_biodata_siswa ON biodata_siswa;

CREATE TRIGGER trg_update_biodata_siswa
BEFORE UPDATE ON biodata_siswa
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_biodata_keluarga ON biodata_keluarga;

CREATE TRIGGER trg_update_biodata_keluarga
BEFORE UPDATE ON biodata_keluarga
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_pendidikan_siswa_sebelumnya ON pendidikan_siswa_sebelumnya;

CREATE TRIGGER trg_update_pendidikan_siswa_sebelumnya
BEFORE UPDATE ON pendidikan_siswa_sebelumnya
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_form_pendaftaran ON form_pendaftaran;

CREATE TRIGGER trg_update_form_pendaftaran
BEFORE UPDATE ON form_pendaftaran
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_dokumen ON dokumen;

CREATE TRIGGER trg_update_dokumen
BEFORE UPDATE ON dokumen
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_pembayaran ON pembayaran;

CREATE TRIGGER trg_update_pembayaran
BEFORE UPDATE ON pembayaran
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_posts ON posts;

CREATE TRIGGER trg_update_posts
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_site_settings ON site_settings;

CREATE TRIGGER trg_update_site_settings
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_update_profiles ON profiles;

CREATE TRIGGER trg_update_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();