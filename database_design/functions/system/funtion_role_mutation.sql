CREATE OR REPLACE FUNCTION public.rbac_is_valid_role_domain(
  p_role TEXT,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    CASE
      WHEN p_role IN ('SUPERADMIN', 'ADMINISTRATOR')
        THEN TRUE

      WHEN p_role = 'PENDAFTAR' AND p_domain = 'SPMB'
        THEN TRUE

      WHEN p_role = 'PUBLIKATOR' AND p_domain = 'PUBLIKASI'
        THEN TRUE

      ELSE FALSE
    END;
$$;

CREATE OR REPLACE FUNCTION public.can_assign_role(
  p_target_role TEXT,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    public.is_superadmin()

    OR (
      public.has_role_in_domain('ADMINISTRATOR', p_domain)
      AND public.rbac_is_valid_role_domain(p_target_role, p_domain)
      AND p_target_role NOT IN ('SUPERADMIN', 'ADMINISTRATOR')
    );
$$;

CREATE OR REPLACE FUNCTION public.can_revoke_role(
  p_target_role TEXT,
  p_target_user_id UUID,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT (
    public.is_superadmin() AND p_target_user_id != auth.uid()
    )

    OR (
      public.has_role_in_domain('ADMINISTRATOR', p_domain)
      AND p_target_user_id != auth.uid()
      AND p_target_role NOT IN ('SUPERADMIN', 'ADMINISTRATOR')
    );
$$;

CREATE OR REPLACE FUNCTION public.can_update_role(
  p_old_role TEXT,
  p_new_role TEXT,
  p_target_user_id UUID,
  p_domain TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    public.is_superadmin()

    OR (
      public.has_role_in_domain('ADMINISTRATOR', p_domain)
      AND p_target_user_id != auth.uid()
      AND p_old_role NOT IN ('SUPERADMIN', 'ADMINISTRATOR')
      AND p_new_role NOT IN ('SUPERADMIN', 'ADMINISTRATOR')
      AND public.rbac_is_valid_role_domain(p_new_role, p_domain)
    );
$$;

