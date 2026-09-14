create or replace function public.fn_rpc_is_guardian_required(
    p_form_id uuid
)
returns boolean
language plpgsql
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

    -- 2. Gunakan bool_or untuk menggantikan max() pada tipe data boolean
    select
        bool_or(case when relation_type = 'AYAH' then status_hidup = 'HIDUP' end),
        bool_or(case when relation_type = 'IBU'  then status_hidup = 'HIDUP' end)
    into
        v_father_alive,
        v_mother_alive
    from public.biodata_keluarga
    where biodata_siswa_id = v_biodata_siswa_id;

    -- 3. Return TRUE jika dan hanya jika KEDUANYA FALSE (sudah meninggal)
    return
        coalesce(v_father_alive, true) = false
        and
        coalesce(v_mother_alive, true) = false;
end;
$$;

revoke execute on function public.fn_rpc_is_guardian_required from public;
grant execute on function public.fn_rpc_is_guardian_required to authenticated;