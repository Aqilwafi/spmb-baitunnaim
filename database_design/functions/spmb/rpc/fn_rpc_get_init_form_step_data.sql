create or replace function public.fn_rpc_get_init_form_step_data(
  p_form_id uuid,
  p_tahun_ajaran_id smallint
)
returns table (
  nama_lengkap varchar,
  nik varchar,
  jenis_kelamin gender_enum,
  tempat_lahir varchar,
  tanggal_lahir date,
  lembaga_tujuan varchar,
  kelas varchar
)
language sql
stable
set search_path = public
as $$
  select
    bs.nama_lengkap,
    bs.nik,
    bs.jenis_kelamin,
    bs.tempat_lahir,
    bs.tanggal_lahir,
    l.label as lembaga_tujuan,
    k.label as kelas
  from form_pendaftaran fp
  join biodata_siswa bs on bs.id = fp.biodata_siswa_id
  left join master_lembaga l on l.id = bs.lembaga_id
  left join master_kelas k on k.id = bs.kelas_id
  where fp.id = p_form_id
    and fp.tahun_ajaran_id = p_tahun_ajaran_id
    and bs.owner_user_id = auth.uid()
    and fp.deleted_at is null
    and bs.deleted_at is null;
$$;

revoke execute on function public.fn_rpc_get_init_form_step_data from public;
grant execute on function public.fn_rpc_get_init_form_step_data to authenticated;