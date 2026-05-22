
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN

    -- create profile safely (idempotent)
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (id, domain_id, role_id)
    VALUES (NEW.id, 1, 1)
    ON CONFLICT (id, domain_id, role_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;

CREATE TRIGGER tr_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_registration();

-- 1. Cabut izin eksekusi dari PUBLIC (termasuk anon dan authenticated)
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_registration() FROM authenticated;

-- 2. Berikan izin eksekusi HANYA kepada postgres (Sistem internal Supabase)
GRANT EXECUTE ON FUNCTION public.handle_new_user_registration() TO postgres;