create or replace function public.fn_rpc_is_guardian_required(
    p_form_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
    v_biodata_siswa_id uuid;
    v_father_alive     boolean;
    v_mother_alive     boolean;
begin   
    -- 1. Ambil biodata_siswa_id milik user yang sedang login
    select biodata_siswa_id into v_biodata_siswa_id
    from public.form_pendaftaran
    where id = p_form_id and pendaftar_id = auth.uid();

    -- Jika form_id tidak ditemukan atau bukan milik pendaftar
    if v_biodata_siswa_id is null then
        return false;
    end if;

    -- 2. Konversi status_hidup langsung menjadi Boolean
    -- TRUE jika 'HIDUP', FALSE jika 'MENINGGAL'
    select
        max(case when relation_type = 'AYAH' then status_hidup = 'HIDUP' end),
        max(case when relation_type = 'IBU'  then status_hidup = 'HIDUP' end)
    into
        v_father_alive,
        v_mother_alive
    from public.biodata_keluarga
    where biodata_siswa_id = v_biodata_siswa_id;

    -- 3. Return TRUE jika dan hanya jika KEDUANYA FALSE (sudah meninggal)
    --    Dalam arti lain, minimal salah satu masih hidup, maka wali tidak wajib
    return
        coalesce(v_father_alive, true) = false
        and
        coalesce(v_mother_alive, true) = false;
end;
$$;