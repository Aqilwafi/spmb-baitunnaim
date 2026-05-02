-- =========================================================
-- 5. FUNCTIONS & TRIGGERS
-- =========================================================

-- A. Auto updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger Pendaftaran
DROP TRIGGER IF EXISTS trg_update_pendaftaran ON form_pendaftaran;
CREATE TRIGGER trg_update_pendaftaran BEFORE UPDATE ON form_pendaftaran FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Profiles
DROP TRIGGER IF EXISTS trg_update_profiles ON profiles;
CREATE TRIGGER trg_update_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Biodata Siswa
DROP TRIGGER IF EXISTS trg_update_biodata_siswa ON biodata_siswa;
CREATE TRIGGER trg_update_biodata_siswa BEFORE UPDATE ON biodata_siswa FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Biodata Keluarga
DROP TRIGGER IF EXISTS trg_update_biodata_keluarga ON biodata_keluarga;
CREATE TRIGGER trg_update_biodata_keluarga BEFORE UPDATE ON biodata_keluarga FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Tempat Tinggal Siswa
DROP TRIGGER IF EXISTS trg_update_tempat_tinggal_siswa ON tempat_tinggal_siswa;
CREATE TRIGGER trg_update_tempat_tinggal_siswa BEFORE UPDATE ON tempat_tinggal_siswa FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Pembayaran
DROP TRIGGER IF EXISTS trg_update_pembayaran ON pembayaran;
CREATE TRIGGER trg_update_pembayaran BEFORE UPDATE ON pembayaran FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Dokumen
DROP TRIGGER IF EXISTS trg_update_dokumen ON dokumen;
CREATE TRIGGER trg_update_dokumen BEFORE UPDATE ON dokumen FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger Revisi
DROP TRIGGER IF EXISTS trg_update_revisi ON revisi;
CREATE TRIGGER trg_update_revisi BEFORE UPDATE ON revisi FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- B. Audit Log
CREATE OR REPLACE FUNCTION fn_audit_log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_trail (user_id, action, details)
    VALUES (auth.uid(), TG_OP || ' ON ' || TG_TABLE_NAME, jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW)));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger audit form_pendaftaran
DROP TRIGGER IF EXISTS tr_audit_pendaftaran ON form_pendaftaran;
CREATE TRIGGER tr_audit_pendaftaran AFTER UPDATE ON form_pendaftaran FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit biodata_siswa
DROP TRIGGER IF EXISTS tr_audit_biodata_siswa ON biodata_siswa;
CREATE TRIGGER tr_audit_biodata_siswa AFTER UPDATE ON biodata_siswa FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit biodata_keluarga
DROP TRIGGER IF EXISTS tr_audit_biodata_keluarga ON biodata_keluarga;
CREATE TRIGGER tr_audit_biodata_keluarga AFTER UPDATE ON biodata_keluarga FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit tempat_tinggal_siswa
DROP TRIGGER IF EXISTS tr_audit_tempat_tinggal_siswa ON tempat_tinggal_siswa;
CREATE TRIGGER tr_audit_tempat_tinggal_siswa AFTER UPDATE ON tempat_tinggal_siswa FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit pembayaran
DROP TRIGGER IF EXISTS tr_audit_pembayaran ON pembayaran;
CREATE TRIGGER tr_audit_pembayaran AFTER UPDATE ON pembayaran FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit dokumen
DROP TRIGGER IF EXISTS tr_audit_dokumen ON dokumen;
CREATE TRIGGER tr_audit_dokumen AFTER UPDATE ON dokumen FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- trigger audit revisi
DROP TRIGGER IF EXISTS tr_audit_revisi ON revisi;
CREATE TRIGGER tr_audit_revisi AFTER UPDATE ON revisi FOR EACH ROW EXECUTE FUNCTION fn_audit_log_changes();

-- C. Auth Registration Handler
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id) VALUES (NEW.id);
    INSERT INTO public.audit_trail (user_id, action, details)
    VALUES (NEW.id, 'INSERT ON profiles', jsonb_build_object('message', 'Otomatis profil pendaftar baru', 'email', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;
CREATE TRIGGER tr_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();

-- D. Role Protection
CREATE OR REPLACE FUNCTION public.prevent_unauthorized_role_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.user_role <> NEW.user_role) AND (COALESCE(auth.jwt() -> 'raw_app_meta_data' ->> 'role', '') <> 'superadmin') THEN
        RAISE EXCEPTION 'Akses Ditolak: Hanya Superadmin yang bisa mengubah Role.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_protect_user_role ON public.profiles;
CREATE TRIGGER tr_protect_user_role
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_unauthorized_role_change();

-- E. Tahun Ajaran Active Switcher
CREATE OR REPLACE FUNCTION fn_switch_tahun_ajaran_active()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_active = TRUE THEN
        UPDATE tahun_ajaran 
        SET is_active = FALSE 
        WHERE id <> NEW.id AND is_active = TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_switch_tahun_ajaran ON tahun_ajaran;
CREATE TRIGGER tr_switch_tahun_ajaran
BEFORE UPDATE ON tahun_ajaran
FOR EACH ROW
WHEN (NEW.is_active IS DISTINCT FROM OLD.is_active AND NEW.is_active = TRUE)
EXECUTE FUNCTION fn_switch_tahun_ajaran_active();