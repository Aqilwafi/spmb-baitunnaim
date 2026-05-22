CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- 1. 🚫 Skip self-audit (hindari infinite loop)
    IF TG_TABLE_NAME IN ('audit_trail', 'activity_logs') THEN
        IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;
    END IF;

    -- 2. 🚫 Skip update tanpa perubahan data sama sekali
    IF TG_OP = 'UPDATE' AND NEW IS NOT DISTINCT FROM OLD THEN
        RETURN NEW;
    END IF;

    -- 3. Ambil ID user yang sedang login (bisa NULL jika lewat migration/backend script)
    v_user_id := auth.uid();

    -- 4. 🛡️ Proses pencatatan ke tabel audit
    BEGIN
        INSERT INTO public.audit_trail (
            user_id,
            table_name,
            record_id,
            action,
            old_data,
            new_data
        )
        VALUES (
            v_user_id,
            TG_TABLE_NAME,
            COALESCE(NEW.id, OLD.id),
            TG_OP,
            CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
            CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
        );
    EXCEPTION
        WHEN OTHERS THEN
            NULL;
    END;

    -- 5. Return akhir sebagai penutup fungsi trigger AFTER
    IF TG_OP = 'DELETE' THEN 
        RETURN OLD; 
    ELSE 
        RETURN NEW; 
    END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth;

-- 🔒 LANGKAH WAJIB: Amankan fungsi dari celah API luar
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_trigger() FROM anon;

-- Izin eksekusi hanya diberikan ke internal database (postgres) agar trigger tetap bekerja
GRANT EXECUTE ON FUNCTION public.audit_trigger() TO postgres;

CREATE TRIGGER tr_audit_biodata_siswa
AFTER INSERT OR UPDATE OR DELETE
ON biodata_siswa
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_biodata_keluarga
AFTER INSERT OR UPDATE OR DELETE
ON biodata_keluarga
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_form_pendaftaran
AFTER INSERT OR UPDATE OR DELETE
ON form_pendaftaran
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_dokumen
AFTER INSERT OR UPDATE OR DELETE
ON dokumen
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_pembayaran
AFTER INSERT OR UPDATE OR DELETE
ON pembayaran
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_pendidikan_siswa_sebelumnya
AFTER INSERT OR UPDATE OR DELETE
ON pendidikan_siswa_sebelumnya
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

-- publikasi
CREATE TRIGGER tr_audit_posts
AFTER INSERT OR UPDATE OR DELETE
ON posts
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

-- authority

CREATE TRIGGER tr_audit_profiles
AFTER INSERT OR UPDATE OR DELETE
ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER tr_audit_user_roles
AFTER INSERT OR UPDATE OR DELETE
ON user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_trigger();