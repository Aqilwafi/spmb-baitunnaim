CREATE FUNCTION public.can_access_biodata_siswa(
    p_action TEXT,
    p_owner_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- superadmin override
    IF public.is_admin_level() THEN
        RETURN TRUE;
    END IF;

    IF p_action = 'SELECT' THEN
        RETURN public.is_current_user(p_owner_id)
               OR public.is_staff();
    END IF;

    IF p_action = 'UPDATE' THEN
        RETURN public.is_current_user(p_owner_id)
               OR public.is_admin_level();
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE FUNCTION public.can_access_profiles(
    p_action TEXT,
    p_owner_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- superadmin override
    IF public.is_superadmin() THEN
        RETURN TRUE;
    END IF;

    IF p_action = 'SELECT' THEN
        RETURN public.is_current_user(p_owner_id)
               OR public.is_staff();
    END IF;

    IF p_action = 'UPDATE' THEN
        RETURN public.is_admin_level();
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;