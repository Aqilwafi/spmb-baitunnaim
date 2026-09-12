create or replace function public.fn_rpc_get_pendidikan_siswa_sebelumnya(
  p_form_id uuid
)
returns table (
  nama_sekolah    varchar(150),
  npsn            public.dom_npsn,
  alamat_sekolah  text,
  tahun_lulus     smallint,
  nilai_rata_rata numeric(5,2),
  catatan         text
)
language sql
stable
set search_path = public
as $$
  select
    pss.nama_sekolah,
    pss.npsn,
    pss.alamat_sekolah,
    pss.tahun_lulus,
    pss.nilai_rata_rata,
    pss.catatan
  from public.form_pendaftaran fp
  join public.biodata_siswa bs on bs.id = fp.biodata_siswa_id
  left join public.pendidikan_siswa_sebelumnya pss on pss.biodata_siswa_id = bs.id
  where fp.id = p_form_id
    and fp.pendaftar_id = auth.uid()
    and bs.owner_user_id = auth.uid()
    and fp.deleted_at is null
    and bs.deleted_at is null;
$$;

comment on function public.fn_rpc_get_pendidikan_siswa_sebelumnya is
  'Mengambil riwayat pendidikan siswa sebelumnya berdasarkan p_form_id untuk prefill form. Menggunakan LEFT JOIN agar jika data belum diisi, nilai kosong tetap aman.';

revoke execute on function public.fn_rpc_get_pendidikan_siswa_sebelumnya from public;
grant execute on function public.fn_rpc_get_pendidikan_siswa_sebelumnya to authenticated;