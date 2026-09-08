create or replace function public.fn_rpc_submit_biodata_keluarga(
  p_form_id            uuid,
  p_relation_type        family_relation_enum,
  p_nama_lengkap         varchar(150),
  p_status_hidup         life_status_enum default 'HIDUP',
  p_detail_relation_type varchar(50) default null,
  p_nik                  public.dom_nik default null,
  p_tempat_lahir         varchar(100) default null,
  p_tanggal_lahir        date default null,
  p_pekerjaan            varchar(100) default null,
  p_pendidikan_terakhir  varchar(50) default null,
  p_penghasilan          varchar(50) default null,
  p_no_hp                public.dom_nomor_hp default null,
  p_alamat               text default null
)
returns jsonb
language plpgsql
volatile
set search_path = public
as $$
declare
  v_owner_user_id uuid := auth.uid();
  v_keluarga_id   uuid;
  v_biodata_siswa_id uuid;
  v_next_step        smallint;
  
begin
  if v_owner_user_id is null then
    raise exception 'Unauthorized: user tidak terautentikasi'
      using errcode = '28000';
  end if;

  if p_form_id is null then
    raise exception 'Form ID wajib diisi.' using errcode = 'BN400';
  end if;

  -- 1. Validasi step & aturan bisnis linear DULU, sebelum insert apapun
  v_next_step := public.fn_assert_linear_step(
    p_form_id         => p_form_id,
  );

  select biodata_siswa_id into v_biodata_siswa_id
  from public.form_pendaftaran
  where id = p_form_id;

  -- 2. Insert / update (upsert per biodata_siswa_id + relation_type)
  insert into public.biodata_keluarga (
    biodata_siswa_id, relation_type, detail_relation_type, nama_lengkap,
    nik, status_hidup, tempat_lahir, tanggal_lahir,
    pekerjaan, pendidikan_terakhir, penghasilan, no_hp, alamat
  ) values (
    v_biodata_siswa_id, p_relation_type, p_detail_relation_type, p_nama_lengkap,
    p_nik, p_status_hidup, p_tempat_lahir, p_tanggal_lahir,
    p_pekerjaan, p_pendidikan_terakhir, p_penghasilan, p_no_hp, p_alamat
  )
  on conflict (biodata_siswa_id, relation_type) do update set
    detail_relation_type = excluded.detail_relation_type,
    nama_lengkap          = excluded.nama_lengkap,
    nik                    = excluded.nik,
    status_hidup           = excluded.status_hidup,
    tempat_lahir           = excluded.tempat_lahir,
    tanggal_lahir          = excluded.tanggal_lahir,
    pekerjaan              = excluded.pekerjaan,
    pendidikan_terakhir    = excluded.pendidikan_terakhir,
    penghasilan            = excluded.penghasilan,
    no_hp                  = excluded.no_hp,
    alamat                 = excluded.alamat,
    updated_at             = now()
  returning id into v_keluarga_id;

  return jsonb_build_object(
    'success', true,
    'form_id', p_form_id,        -- Sangat berguna di Step 1 untuk disimpan frontend
    'next_step_id', v_next_step -- Untuk tahu arah redirect berikutnya
    );

exception
  when unique_violation then
    raise exception 'NIK sudah terdaftar untuk data keluarga lain'
      using errcode = '23505';
  when check_violation then
    raise exception 'Data tidak lengkap atau tidak valid untuk kombinasi status_hidup/relation_type ini'
      using errcode = '23514';
end;
$$;

comment on function public.fn_rpc_submit_biodata_keluarga is
  'Insert/update biodata keluarga (AYAH/IBU/WALI) untuk satu biodata_siswa. '
  'Dipanggil terpisah per relation_type (2-3x per siswa). Upsert berdasarkan (biodata_siswa_id, relation_type). '
  'Constraint chk_hidup_require_data dan chk_wali_data ditegakkan di level tabel; validasi "AYAH+IBU wajib ada" '
  'dan "WALI wajib jika ortu MENINGGAL" ditegakkan di RPC terpisah (belum dibuat).';

revoke execute on function public.fn_rpc_submit_biodata_keluarga from public;
grant execute on function public.fn_rpc_submit_biodata_keluarga to authenticated;