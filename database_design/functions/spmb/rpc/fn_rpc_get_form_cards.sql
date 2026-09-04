create or replace function public.fn_rpc_get_form_cards(
  p_tahun_ajaran_id smallint
)
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
  with active_ta as (
    -- pastikan tahun ajaran ada, aktif, dan belum dihapus
    select id 
    from master_tahun_ajaran 
    where id = p_tahun_ajaran_id 
      and is_active = true 
  ),
  my_siswa as (
    -- saring biodata milik user ini saja
    select id, nama_lengkap, lembaga_id, kelas_id
    from biodata_siswa
    where owner_user_id = auth.uid()
      and deleted_at is null
  )
  select
    fp.id,
    ms.nama_lengkap,
    ml.label as lembaga_label,
    mk.label as kelas_label,
    mst.label as step_label,
    fp.registration_status,
    fp.admission_status,
    fp.updated_at
  from my_siswa ms
  join form_pendaftaran fp on fp.biodata_siswa_id = ms.id
  join active_ta ta on ta.id = fp.tahun_ajaran_id
  left join master_lembaga ml on ml.id = ms.lembaga_id
  left join master_kelas mk on mk.id = ms.kelas_id
  left join master_step mst on mst.id = fp.step_id
  where fp.deleted_at is null
  order by fp.updated_at desc;
$$;

revoke execute on function public.fn_rpc_get_form_cards from public;
grant execute on function public.fn_rpc_get_form_cards to authenticated;