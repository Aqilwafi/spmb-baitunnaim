create or replace function public.fn_rpc_get_biodata_siswa_detail(
  p_form_id uuid
)
returns table (
  nisn                 public.dom_nisn,
  no_kk                public.dom_kk,
  agama                agama_enum,
  anak_ke              int,
  jumlah_saudara       int,
  hobi                 varchar(100),
  cita_cita            varchar(100),
  penyakit             text,
  alamat               text,
  tinggal_bersama_id   smallint,
  status_rumah_id      smallint
)
language sql
stable
set search_path = public
as $$
  select
    bs.nisn,
    bsd.no_kk,
    bsd.agama,
    bsd.anak_ke,
    bsd.jumlah_saudara,
    bsd.hobi,
    bsd.cita_cita,
    bsd.penyakit,
    bsd.alamat,
    bsd.tinggal_bersama_id,
    bsd.status_rumah_id
  from public.form_pendaftaran fp
  join public.biodata_siswa bs on bs.id = fp.biodata_siswa_id
  left join public.biodata_siswa_detail bsd on bsd.id = bs.id
  where fp.id = p_form_id
    and fp.pendaftar_id = auth.uid()
    and bs.owner_user_id = auth.uid()
    and fp.deleted_at is null
    and bs.deleted_at is null;
$$;

comment on function public.fn_rpc_get_biodata_siswa_detail is
  'Mengambil detail biodata siswa berdasarkan p_form_id untuk prefill form step detail. Menggunakan LEFT JOIN agar jika detail belum diisi, data dasar tetap return.';

revoke execute on function public.fn_rpc_get_biodata_siswa_detail from public;
grant execute on function public.fn_rpc_get_biodata_siswa_detail to authenticated;