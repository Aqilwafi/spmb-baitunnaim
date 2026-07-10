CREATE OR REPLACE FUNCTION public.activity_logger(
    p_event TEXT,
    p_status TEXT DEFAULT 'success',
    p_metadata JSONB DEFAULT '{}'::jsonb,
    p_user_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.activity_logs (
        user_id,
        event,
        status,
        metadata
    )
    VALUES (
        COALESCE(p_user_id, auth.uid()),
        p_event,
        p_status,
        p_metadata
    );
-- Catatan: Blok EXCEPTION dihapus agar performa stabil dan tidak menyembunyikan error struktural
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth; -- Ditambahkan pg_catalog dan auth agar auth.uid() terbaca

-- LANGKAH PENGAMANAN TAMBAHAN (Wajib):
-- 1. Cabut hak akses dari semua orang di internet (anon & authenticated)
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada postgres (internal system) dan service_role (backend)
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO postgres;
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO service_role;

CREATE OR REPLACE FUNCTION public.on_auth_user_action()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, auth
AS $$
BEGIN
    -- Jika user baru saja mendaftar (Sign Up)
    IF TG_OP = 'INSERT' THEN
        PERFORM public.activity_logger(
            'USER_SIGNUP', 
            'success', 
            jsonb_build_object('email', NEW.email), 
            NEW.id
        );
    
    -- Jika user melakukan login (diidentifikasi dari kolom last_sign_in_at yang berubah)
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
            PERFORM public.activity_logger(
                'USER_LOGIN', 
                'success', 
                jsonb_build_object(
                    'email', NEW.email, 
                    'ip_address', auth.auth_metadata() ->> 'ip'
                ),
                NEW.id
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_action_trigger
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.on_auth_user_action();

  -- 1. Cabut izin eksekusi dari publik dan role bawaan API Supabase
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada sistem internal (postgres)
GRANT EXECUTE ON FUNCTION public.on_auth_user_action() TO postgres;