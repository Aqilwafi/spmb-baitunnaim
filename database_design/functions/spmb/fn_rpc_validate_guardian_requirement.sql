create or replace function public.fn_validate_guardian_requirement(
    p_biodata_siswa_id uuid
)
returns void
language plpgsql
set search_path = public
as $$
declare
    v_guardian_exists boolean;
begin
    -- jika wali tidak diwajibkan, langsung lolos
    if not public.fn_is_guardian_required(p_biodata_siswa_id) then
        return;
    end if;

    -- pastikan data wali sudah ada
    select exists (
        select 1
        from public.biodata_keluarga
        where biodata_siswa_id = p_biodata_siswa_id
          and hubungan = 'WALI'
    )
    into v_guardian_exists;

    if not v_guardian_exists then
        raise exception 'Data wali wajib diisi karena ayah dan ibu telah meninggal.';
    end if;
end;
$$;