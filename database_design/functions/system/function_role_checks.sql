-- 1. Mengecek apakah user memegang sebuah role tertentu (tanpa peduli domainnya)
CREATE OR REPLACE FUNCTION public.get_access_rights()
RETURNS TEXT[]
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' -> 'access_right')::jsonb::text[],
    ARRAY[]::text[]
  );
$$;

CREATE OR REPLACE FUNCTION public.has_access(p_domain TEXT, p_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 1) = p_domain
      AND split_part(ar, ':', 2) = p_role
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(p_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 2) = p_role
  );
$$;

-- 2. Mengecek apakah user memegang salah satu dari beberapa role yang dimasukkan (tanpa peduli domain)
CREATE OR REPLACE FUNCTION public.has_any_role(p_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 2) = ANY(p_roles)
  );
$$;

-- 3. Shortcut untuk memastikan apakah user adalah seorang SUPERADMIN
CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 2) = 'SUPERADMIN'
  );
$$;

-- 4. Mengecek apakah kasta user masuk ke kategori Administrator atau Superadmin (Dipakai di RLS kamu!)
CREATE OR REPLACE FUNCTION public.is_admin_level()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 2) IN ('ADMINISTRATOR', 'SUPERADMIN')
  );
$$;

-- 5. Mengecek kombinasi berpasangan antara role DAN domain (Kunci utama aplikasi kamu)
CREATE OR REPLACE FUNCTION public.has_role_in_domain(
  p_domain TEXT,
  p_role TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(public.get_access_rights()) ar
    WHERE split_part(ar, ':', 1) = p_domain
      AND split_part(ar, ':', 2) = p_role
  );
$$;