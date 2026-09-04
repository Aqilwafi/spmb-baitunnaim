create or replace function public.fn_rpc_get_form_detail(
  p_form_id uuid,
  p_tahun_ajaran_id smallint
)
returns table (
  id uuid,
  biodata_siswa_id uuid,
  step_id smallint, -- diubah menjadi smallint
  admission_status admission_status_enum,
  nama_lengkap varchar,
  pendaftar_id uuid
)
language sql
stable
set search_path = public
as $$
  select
    fp.id,
    fp.biodata_siswa_id,
    fp.step_id,
    fp.admission_status,
    bs.nama_lengkap,
    bs.owner_user_id as pendaftar_id
  from form_pendaftaran fp
  join biodata_siswa bs on bs.id = fp.biodata_siswa_id
  where fp.id = p_form_id
    and bs.owner_user_id = auth.uid()
    and fp.tahun_ajaran_id = p_tahun_ajaran_id
    and fp.deleted_at is null
    and bs.deleted_at is null;
$$;

revoke execute on function public.fn_rpc_get_form_detail(uuid, smallint) from public;
grant execute on function public.fn_rpc_get_form_detail(uuid, smallint) to authenticated;