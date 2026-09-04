create or replace function public.fn_rpc_init_form(
  p_nik             public.dom_nik,
  p_nama_lengkap    varchar(255),
  p_gender          gender_enum,
  p_tempat_lahir    varchar(255),
  p_tanggal_lahir   date,
  p_lembaga_id      smallint,
  p_tahun_ajaran_id smallint,
  p_step_id         smallint,
  p_kelas_id        smallint default null
)
returns jsonb
language plpgsql
volatile
set search_path = public
as $$
declare
  v_owner_user_id uuid := auth.uid();
  v_siswa_id      uuid;
  v_form_id       uuid;
begin
  if v_owner_user_id is null then
    raise exception 'Unauthorized: user tidak terautentikasi'
      using errcode = '28000';
  end if;

  if exists (select 1 from public.biodata_siswa where nik = p_nik) then
    raise exception 'NIK sudah terdaftar dalam sistem'
      using errcode = '23505';
  end if;

  insert into public.biodata_siswa (
    owner_user_id, nik, nama_lengkap, jenis_kelamin,
    tempat_lahir, tanggal_lahir, lembaga_id, kelas_id, catatan
  ) values (
    v_owner_user_id, p_nik, p_nama_lengkap, p_gender,
    p_tempat_lahir, p_tanggal_lahir, p_lembaga_id, p_kelas_id,
    'Init Form. NISN akan diisi saat biodata siswa.'
  )
  returning id into v_siswa_id;

  insert into public.form_pendaftaran (
    biodata_siswa_id, pendaftar_id, tahun_ajaran_id, step_id
  ) values (
    v_siswa_id, v_owner_user_id, p_tahun_ajaran_id, p_step_id
  )
  returning id into v_form_id;

  return jsonb_build_object(
    'form_id', v_form_id,
    'siswa_id', v_siswa_id
  );

exception
  when unique_violation then
    raise exception 'NIK sudah terdaftar dalam sistem';
end;
$$;

comment on function public.fn_rpc_init_form is
  'Init form pendaftaran untuk siswa BARU (NIK belum pernah terdaftar). '
  'owner_user_id diambil dari auth.uid() (security invoker), tidak menerima parameter owner. '
  'Untuk siswa lama daftar ulang tahun ajaran baru, gunakan RPC terpisah (belum dibuat, di luar scope MVP transfer ownership).';

revoke execute on function public.fn_rpc_init_form from public;
grant execute on function public.fn_rpc_init_form to authenticated;