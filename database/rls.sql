-- =========================================================
-- AUTH CORE
-- =========================================================

CREATE OR REPLACE FUNCTION public.is_current_user(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT p_user_id = auth.uid();
$$;


CREATE OR REPLACE FUNCTION public.has_role(p_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN master_roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
    AND r.code = p_role
  );
$$;


CREATE OR REPLACE FUNCTION public.has_any_role(p_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN master_roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
    AND r.code = ANY(p_roles)
  );
$$;


CREATE OR REPLACE FUNCTION public.has_role_in_domain(
  p_role TEXT,
  p_domain SMALLINT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN master_roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
    AND r.code = p_role
    AND ur.domain_id = p_domain
  );
$$;


CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT public.has_role('SUPERADMIN');
$$;


-- =========================================================
-- BUSINESS POLICY LAYER
-- =========================================================

-- BIODATA SISWA
CREATE OR REPLACE FUNCTION public.can_access_biodata_siswa(
  p_action TEXT,
  p_owner_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- GLOBAL OVERRIDE
  IF public.is_superadmin() THEN
    RETURN TRUE;
  END IF;

  -- SELECT RULE
  IF p_action = 'SELECT' THEN
    RETURN public.is_current_user(p_owner_id)
           OR public.has_any_role(ARRAY['VERIFIKATOR','ADMINISTRATOR']);
  END IF;

  -- UPDATE RULE
  IF p_action = 'UPDATE' THEN
    RETURN public.is_current_user(p_owner_id)
           OR public.has_role('ADMINISTRATOR');
  END IF;

  RETURN FALSE;
END;
$$;


-- PROFILES
CREATE OR REPLACE FUNCTION public.can_access_profiles(
  p_action TEXT,
  p_owner_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF public.is_superadmin() THEN
    RETURN TRUE;
  END IF;

  IF p_action = 'SELECT' THEN
    RETURN public.is_current_user(p_owner_id)
           OR public.has_any_role(ARRAY['ADMINISTRATOR','VERIFIKATOR']);
  END IF;

  IF p_action = 'UPDATE' THEN
    RETURN public.is_current_user(p_owner_id);
  END IF;

  RETURN FALSE;
END;
$$;


-- =========================================================
-- SYSTEM / GOVERNANCE LAYER
-- =========================================================

-- ROLE ASSIGNMENT CONTROL
CREATE OR REPLACE FUNCTION public.can_assign_role(
  p_target_role TEXT,
  p_domain SMALLINT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    public.is_superadmin()
    OR (
      public.has_role_in_domain('ADMINISTRATOR', p_domain)
      AND p_target_role <> 'SUPERADMIN'
    );
$$;


-- =========================================================
-- OPTIONAL UTILITY (future expansion)
-- =========================================================

CREATE OR REPLACE FUNCTION public.is_admin_level()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT public.has_any_role(ARRAY[
    'ADMINISTRATOR',
    'SUPERADMIN'
  ]);
$$;