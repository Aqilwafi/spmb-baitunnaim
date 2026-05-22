-- 1. Mengecek apakah user memegang sebuah role tertentu (tanpa peduli domainnya)
CREATE OR REPLACE FUNCTION public.has_role(p_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = p_role
  );
$$;

-- 2. Mengecek apakah user memegang salah satu dari beberapa role yang dimasukkan (tanpa peduli domain)
CREATE OR REPLACE FUNCTION public.has_any_role(p_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = ANY(p_roles)
  );
$$;

-- 3. Shortcut untuk memastikan apakah user adalah seorang SUPERADMIN
CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = 'SUPERADMIN'
  );
$$;

-- 4. Mengecek apakah kasta user masuk ke kategori Administrator atau Superadmin (Dipakai di RLS kamu!)
CREATE OR REPLACE FUNCTION public.is_admin_level()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') IN ('ADMINISTRATOR', 'SUPERADMIN')
  );
$$;

-- 5. Mengecek kombinasi berpasangan antara role DAN domain (Kunci utama aplikasi kamu)
CREATE OR REPLACE FUNCTION public.has_role_in_domain(
  p_role TEXT,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public, pg_catalog, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(coalesce(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb)) r
    WHERE (r ->> 'role') = p_role
      AND (r ->> 'domain') = p_domain
  );
$$;