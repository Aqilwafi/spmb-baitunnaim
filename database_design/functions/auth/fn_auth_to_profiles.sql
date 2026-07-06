-- ====================================================================
-- A. FASE BEFORE INSERT: Inject Metadata ke auth.users
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user_metadata_before()
RETURNS TRIGGER AS $$
DECLARE
    v_username TEXT;
BEGIN
    -- 1. Ambil username dari inputan user, atau fallback ke bagian depan email
    v_username := COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1));

    -- 2. Inject ke raw_user_meta_data (untuk tampilan/profil)
    NEW.raw_user_meta_data = COALESCE(NEW.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
        'username', v_username
    );

    -- 3. Inject ke raw_app_meta_data (untuk access_rights)
    -- Catatan: Kita langsung pasang access_rights awal di sini 
    -- agar saat user pertama kali login, token JWT sudah langsung memiliki role tersebut.
    NEW.raw_app_meta_data = COALESCE(NEW.raw_app_meta_data, '{}'::jsonb) || jsonb_build_object(
        'access_rights', jsonb_build_array('SPMB:PENDAFTAR')
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ====================================================================
-- B. FASE AFTER INSERT: Buat Data Profil & Relasi Awal
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user_relations_after()
RETURNS TRIGGER AS $$
BEGIN
    -- Membuat profile baru secara aman
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;

    -- Menghubungkan user ke domain_id: 1 dan role_id: 1 (Gunakan nama kolom user_id)
    INSERT INTO public.user_roles (user_id, domain_id, role_id)
    VALUES (NEW.id, 1, 1)
    ON CONFLICT (user_id, domain_id, role_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ====================================================================
-- C. MEMBERSIHKAN DAN MEMASANG TRIGGER PENDAFTARAN
-- ====================================================================
DROP TRIGGER IF EXISTS tr_on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS tr_before_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS tr_after_auth_user_created ON auth.users;

CREATE TRIGGER tr_before_auth_user_created
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_metadata_before();

CREATE TRIGGER tr_after_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_relations_after();

-- ====================================================================
-- D. PENGATURAN HAK AKSES KEAMANAN PENDAFTARAN
-- ====================================================================
REVOKE EXECUTE ON FUNCTION public.handle_new_user_metadata_before() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user_metadata_before() TO postgres;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_relations_after() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user_relations_after() TO postgres;

-- ====================================================================
-- A. FASE AFTER CRUD: Sinkronisasi ke auth.users
-- ====================================================================
CREATE OR REPLACE FUNCTION public.sync_user_app_metadata()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
    v_access_rights JSONB;
BEGIN
    -- Tentukan ID user berdasarkan aksi CRUD
    IF TG_OP = 'DELETE' THEN
        v_user_id := OLD.user_id;
    ELSE
        v_user_id := NEW.user_id;
    END IF;

    -- 1. Ambil data gabungan DOMAIN:ROLE yang aktif (tidak di-suspend)
    SELECT jsonb_agg(d.code || ':' || r.code) INTO v_access_rights
    FROM public.user_roles ur
    JOIN public.master_roles r ON ur.role_id = r.id
    JOIN public.master_domains d ON ur.domain_id = d.id
    WHERE ur.user_id = v_user_id 
      AND ur.suspended_at IS NULL;

    -- 2. Update ke auth.users sambil MEMBERSIHKAN key lama ('roles' dan 'domains')
    UPDATE auth.users
    SET raw_app_meta_data = (
        -- Langkah A: Hapus key 'roles' dan 'domains' lama jika ada
        COALESCE(raw_app_meta_data, '{}'::jsonb) - 'roles' - 'domains'
    ) || jsonb_build_object(
        -- Langkah B: Masukkan key baru yang sudah valid relasinya
        'access_rights', COALESCE(v_access_rights, '[]'::jsonb)
    )
    WHERE id = v_user_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================================================================
-- B. MEMASANG TRIGGER SINKRONISASI
-- ====================================================================
DROP TRIGGER IF EXISTS tr_sync_user_app_metadata ON public.user_roles;

CREATE TRIGGER tr_sync_user_app_metadata
AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_app_metadata();

-- ====================================================================
-- C. PENGATURAN HAK AKSES KEAMANAN SINKRONISASI
-- ====================================================================
REVOKE EXECUTE ON FUNCTION public.sync_user_app_metadata() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sync_user_app_metadata() TO postgres;


-- email sync
CREATE OR REPLACE FUNCTION public.sync_email_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.email <> NEW.email THEN
    UPDATE public.profiles
    SET email = NEW.email
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.sync_email_update();

CREATE OR REPLACE FUNCTION public.sync_username_to_auth()
RETURNS TRIGGER AS $$
BEGIN
    -- Langsung update ke auth.users tanpa join yang berat
    UPDATE auth.users
    SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('username', NEW.username)
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang hanya di tabel profiles
CREATE TRIGGER tr_sync_username_profiles
AFTER UPDATE OF username ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_username_to_auth();