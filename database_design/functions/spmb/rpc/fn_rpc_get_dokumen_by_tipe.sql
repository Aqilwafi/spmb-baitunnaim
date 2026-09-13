create or replace function public.fn_rpc_get_dokumen_by_tipe(
  p_form_id uuid,
  p_tipe_dokumen_id smallint
)
returns table (
  id                  uuid,
  form_pendaftaran_id uuid,
  tipe_dokumen_id     smallint,
  file_url            text,
  document_status     document_status_enum,
  catatan_verifikasi  text,
  verified_by         uuid,
  verified_at         timestamptz,
  uploaded_at         timestamptz
)
language sql
stable
set search_path = public
as $$
  select
    d.id,
    d.form_pendaftaran_id,
    d.tipe_dokumen_id,
    d.file_url,
    d.document_status,
    d.catatan_verifikasi,
    d.verified_by,
    d.verified_at,
    d.uploaded_at
  from public.form_pendaftaran fp
  left join public.dokumen d on d.form_pendaftaran_id = fp.id
    and d.tipe_dokumen_id = p_tipe_dokumen_id
    and d.deleted_at is null
  where fp.id = p_form_id
    and fp.tahun_ajaran_id = public.fn_get_active_tahun_ajaran_id()
    and fp.pendaftar_id = auth.uid()
    and fp.deleted_at is null;
$$;

comment on function public.fn_rpc_get_dokumen_by_tipe(uuid, smallint) is
  'Mengambil data dokumen berdasarkan p_form_id dan tipe_dokumen_id tertentu. Menggunakan LEFT JOIN agar aman jika dokumen belum diunggah.';

revoke execute on function public.fn_rpc_get_dokumen_by_tipe(uuid, smallint) from public;
grant execute on function public.fn_rpc_get_dokumen_by_tipe(uuid, smallint) to authenticated;