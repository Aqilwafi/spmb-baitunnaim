create or replace function public.fn_rpc_get_biodata_keluarga(
  p_form_id uuid,
  p_relation_type family_relation_enum
)
returns table (
  relation_type         family_relation_enum,
  detail_relation_type  varchar(50),
  nama_lengkap          varchar(150),
  nik                   public.dom_nik,
  status_hidup          life_status_enum,
  tempat_lahir          varchar(100),
  tanggal_lahir         date,
  pekerjaan             varchar(100),
  pendidikan_terakhir   varchar(50),
  penghasilan           varchar(50),
  no_hp                 public.dom_nomor_hp,
  alamat                text
)
language sql
stable
set search_path = public
as $$
  select
    bk.relation_type,
    bk.detail_relation_type,
    bk.nama_lengkap,
    bk.nik,
    bk.status_hidup,
    bk.tempat_lahir,
    bk.tanggal_lahir,
    bk.pekerjaan,
    bk.pendidikan_terakhir,
    bk.penghasilan,
    bk.no_hp,
    bk.alamat
  from public.form_pendaftaran fp
  left join public.biodata_keluarga bk on bk.biodata_siswa_id = fp.biodata_siswa_id 
    and bk.relation_type = p_relation_type
  where fp.id = p_form_id
    and fp.tahun_ajaran_id = public.fn_get_active_tahun_ajaran_id()
    and fp.pendaftar_id = auth.uid()
    and fp.deleted_at is null;
$$;

comment on function public.fn_rpc_get_biodata_keluarga(uuid, family_relation_enum) is
  'Mengambil spesifik biodata keluarga berdasarkan p_form_id dan relation_type tertentu (AYAH/IBU/WALI) langsung via relasi form_pendaftaran ke biodata_siswa_id.';

revoke execute on function public.fn_rpc_get_biodata_keluarga(uuid, family_relation_enum) from public;
grant execute on function public.fn_rpc_get_biodata_keluarga(uuid, family_relation_enum) to authenticated;