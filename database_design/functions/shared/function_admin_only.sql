-- internal function, tidak di-expose langsung ke client
CREATE OR REPLACE FUNCTION public.reassign_siswa_owner(
    p_siswa_id UUID,
    p_new_owner UUID,
    p_reason TEXT DEFAULT NULL,
    p_reclaim_request_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_old_owner UUID;
BEGIN
    -- ambil owner lama
    SELECT akun_pendaftar_id INTO v_old_owner
    FROM biodata_siswa
    WHERE id = p_siswa_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Data siswa tidak ditemukan';
    END IF;

    -- update owner
    UPDATE biodata_siswa
    SET akun_pendaftar_id = p_new_owner
    WHERE id = p_siswa_id;

    -- catat ke history
    INSERT INTO biodata_siswa_owner_history (
        siswa_id,
        old_owner_id,
        new_owner_id,
        changed_by,
        reclaim_request_id,
        is_manual,
        reason
    )
    VALUES (
        p_siswa_id,
        v_old_owner,
        p_new_owner,
        auth.uid(),
        p_reclaim_request_id,
        p_reclaim_request_id IS NULL,
        COALESCE(p_reason, 'Reassign by admin')
    );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;


-- di-expose via RPC untuk jalur online
CREATE OR REPLACE FUNCTION public.approve_siswa_reclaim(
    p_request_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_request siswa_reclaim_request%ROWTYPE;
BEGIN
    -- validasi admin level
    IF NOT public.is_admin_level() THEN
        RAISE EXCEPTION 'Akses ditolak';
    END IF;

    -- ambil request
    SELECT * INTO v_request
    FROM siswa_reclaim_request
    WHERE id = p_request_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Request tidak ditemukan';
    END IF;

    IF v_request.status <> 'PENDING' THEN
        RAISE EXCEPTION 'Request sudah diproses sebelumnya';
    END IF;

    -- update status reclaim
    UPDATE siswa_reclaim_request
    SET
        status = 'APPROVED',
        verified_by = auth.uid(),
        verified_at = NOW(),
        updated_at = NOW()
    WHERE id = p_request_id;

    -- panggil reassign internal
    PERFORM public.reassign_siswa_owner(
        v_request.siswa_id,
        v_request.requested_by,
        'Reclaim request approved by admin',
        p_request_id
    );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;