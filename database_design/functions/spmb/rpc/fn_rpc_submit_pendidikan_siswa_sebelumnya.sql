create or replace function public.fn_rpc_submit_pendidikan_siswa_sebelumnya(
  p_form_id         uuid,
  p_nama_sekolah    varchar(150),
  p_npsn            public.dom_npsn,
  p_alamat_sekolah  text,
  p_tahun_lulus     smallint,
  p_nilai_rata_rata numeric(5,2),
  p_catatan         text default null
)
returns jsonb
language plpgsql
volatile
set search_path = public
as $$
declare
  v_owner_user_id    uuid := auth.uid();
  v_biodata_siswa_id uuid;
  v_next_step        smallint;
begin
  if v_owner_user_id is null then
    raise exception 'Unauthorized' using errcode = '28000';
  end if;

  if p_form_id is null then
    raise exception 'Form ID wajib diisi.' using errcode = 'BN400';
  end if;

  -- 1. Validasi step & ownership form LEWAT HELPER
  v_next_step := public.fn_assert_linear_step(
    p_form_id => p_form_id
  );

  -- 2. Ambil biodata_siswa_id dari form_pendaftaran
  select biodata_siswa_id into v_biodata_siswa_id
  from public.form_pendaftaran
  where id = p_form_id;

  if v_biodata_siswa_id is null then
    raise exception 'Biodata siswa tidak ditemukan untuk form ini.' using errcode = 'BN404';
  end if;

  -- 3. Insert atau Upsert ke pendidikan_siswa_sebelumnya (1:1 dengan biodata_siswa_id)
  insert into public.pendidikan_siswa_sebelumnya (
    biodata_siswa_id,
    nama_sekolah,
    npsn,
    alamat_sekolah,
    tahun_lulus,
    nilai_rata_rata,
    catatan
  ) values (
    v_biodata_siswa_id,
    nullif(trim(p_nama_sekolah), ''),
    p_npsn,
    nullif(trim(p_alamat_sekolah), ''),
    p_tahun_lulus,
    p_nilai_rata_rata,
    nullif(trim(p_catatan), '')
  )
  on conflict (biodata_siswa_id) do update set
    nama_sekolah    = excluded.nama_sekolah,
    npsn            = excluded.npsn,
    alamat_sekolah  = excluded.alamat_sekolah,
    tahun_lulus     = excluded.tahun_lulus,
    nilai_rata_rata = excluded.nilai_rata_rata,
    catatan         = excluded.catatan,
    updated_at      = now();

  -- 4. Update step form_pendaftaran ke next step hasil helper
  update public.form_pendaftaran
  set step_id = v_next_step,
      updated_at = now()
  where id = p_form_id
    and pendaftar_id = v_owner_user_id;

  return jsonb_build_object(
    'success', true,
    'form_id', p_form_id,
    'next_step_id', v_next_step
  );

exception
  when check_violation then
    raise exception 'Data sekolah atau catatan tidak memenuhi persyaratan validasi (chk_school_or_note).'
      using errcode = '23514';
end;
$$;

comment on function public.fn_rpc_submit_pendidikan_siswa_sebelumnya is
  'Submit riwayat pendidikan siswa sebelumnya (1:1 dengan biodata_siswa). '
  'Step & ownership divalidasi via fn_assert_linear_step, menggunakan upsert (on conflict biodata_siswa_id).';

revoke execute on function public.fn_rpc_submit_pendidikan_siswa_sebelumnya from public;
grant execute on function public.fn_rpc_submit_pendidikan_siswa_sebelumnya to authenticated;