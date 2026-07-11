create or replace function public.fn_rpc_is_guardian_required(
    p_biodata_siswa_id uuid
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
    v_father_alive boolean;
    v_mother_alive boolean;
begin
    select
        max(case when hubungan = 'AYAH' then status_hidup end),
        max(case when hubungan = 'IBU' then status_hidup end)
    into
        v_father_alive,
        v_mother_alive
    from public.biodata_keluarga
    where biodata_siswa_id = p_biodata_siswa_id;

    return
        coalesce(v_father_alive, true) = false
        and
        coalesce(v_mother_alive, true) = false;
end;
$$;