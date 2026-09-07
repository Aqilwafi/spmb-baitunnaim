create or replace function public.fn_rpc_submit_biodata_siswa_detail(
  p_form_id            uuid,
  p_nisn               public.dom_nisn,
  p_no_kk              public.dom_kk,
  p_agama              agama_enum,
  p_anak_ke            int,
  p_jumlah_saudara     int,
  p_hobi               varchar(100),
  p_cita_cita          varchar(100),
  p_alamat             text,
  p_tinggal_bersama_id smallint,
  p_status_rumah_id    smallint,
  p_step_id            smallint default 3,
  p_penyakit           text default null
)
returns jsonb
language plpgsql
volatile
set search_path = public
as $$
declare
  v_owner_user_id uuid := auth.uid();
  v_biodata_siswa_id uuid;
  v_next_step        smallint;
begin
  if v_owner_user_id is null then
    raise exception 'Unauthorized' using errcode = '28000';
  end if;

  -- 1. Validasi step & ownership form LEWAT HELPER (bukan manual)
  v_next_step := public.fn_assert_linear_step(
    p_form_id      => p_form_id,
    p_current_step => p_step_id
  );

  -- 2. Ambil biodata_siswa_id dari form (sudah pasti valid & milik user ini, terverifikasi oleh helper di atas)
  select biodata_siswa_id into v_biodata_siswa_id
  from public.form_pendaftaran
  where id = p_form_id;

  -- 3. Insert biodata_siswa_detail (1:1, id = biodata_siswa_id)
  insert into public.biodata_siswa_detail (
    id, no_kk, agama, anak_ke, jumlah_saudara,
    hobi, cita_cita, penyakit, alamat,
    tinggal_bersama_id, status_rumah_id
  ) values (
    v_biodata_siswa_id, p_no_kk, p_agama, p_anak_ke, p_jumlah_saudara,
    p_hobi, p_cita_cita, p_penyakit, p_alamat,
    p_tinggal_bersama_id, p_status_rumah_id
  );

  -- 4. Update biodata_siswa: isi NISN, kosongkan catatan (sesuai chk_nisn_or_reason)
  update public.biodata_siswa
  set nisn = p_nisn,
      catatan = null,
      updated_at = now()
  where id = v_biodata_siswa_id
    and owner_user_id = v_owner_user_id;

  -- 5. Update step form_pendaftaran ke next step hasil helper
  update public.form_pendaftaran
  set step_id = v_next_step,
      updated_at = now()
  where id = p_form_id
    and pendaftar_id = v_owner_user_id;

  return jsonb_build_object(
    'success', true,
    'next_step', v_next_step
  );

exception
  when unique_violation then
    raise exception 'NISN sudah terdaftar dalam sistem'
      using errcode = '23505';
end;
$$;

comment on function public.fn_rpc_submit_biodata_siswa_detail is
  'Submit biodata siswa detail (1:1 dengan biodata_siswa). '
  'Sekaligus mengisi NISN dan mengosongkan catatan di biodata_siswa (constraint chk_nisn_or_reason). '
  'Step & ownership divalidasi via fn_assert_linear_step, security invoker (RLS tetap berlaku untuk semua insert/update).';

revoke execute on function public.fn_rpc_submit_biodata_siswa_detail from public;
grant execute on function public.fn_rpc_submit_biodata_siswa_detail to authenticated;