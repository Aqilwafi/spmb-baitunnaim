create or replace function public.fn_rpc_get_form_cards()
returns table (
  id uuid,
  nama_lengkap varchar,
  lembaga_label varchar,
  kelas_label varchar,
  step_label varchar,
  registration_status registration_form_status_enum,
  admission_status admission_status_enum,
  updated_at timestamptz
)
language sql
stable
set search_path = public
as $$
  select
    fp.id,
    bs.nama_lengkap,
    ml.label as lembaga_label,
    mk.label as kelas_label,
    mst.label as step_label,
    fp.registration_status,
    fp.admission_status,
    fp.updated_at
  from form_pendaftaran fp
  join biodata_siswa bs on bs.id = fp.biodata_siswa_id
  left join master_lembaga ml on ml.id = bs.lembaga_id
  left join master_kelas mk on mk.id = bs.kelas_id
  left join master_step mst on mst.id = fp.step_id
  where fp.tahun_ajaran_id = public.fn_get_active_tahun_ajaran_id()
    and fp.pendaftar_id = auth.uid()
    and fp.deleted_at is null
    and bs.deleted_at is null
  order by fp.updated_at desc;
$$;

revoke execute on function public.fn_rpc_get_form_cards from public;
grant execute on function public.fn_rpc_get_form_cards to authenticated;