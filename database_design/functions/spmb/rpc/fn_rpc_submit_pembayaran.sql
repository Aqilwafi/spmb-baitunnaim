create or replace function public.fn_rpc_submit_pembayaran(
  p_form_id   uuid,
  p_file_path text
)
returns jsonb
language plpgsql
volatile
security invoker -- Tetap menjaga konteks hak akses RLS user yang memanggil
set search_path = public
as $$
declare
  v_owner_user_id uuid := auth.uid();
  v_file_exists   boolean;
  v_next_step     smallint;
begin
  -- 1. Cek Autentikasi
  if v_owner_user_id is null then
    raise exception 'Unauthorized' using errcode = '28000';
  end if;

  -- 2. Validasi Input Parameter
  if p_form_id is null or p_file_path is null or trim(p_file_path) = '' then
    raise exception 'Form ID dan file path wajib diisi.' using errcode = '40000';
  end if;

  -- 3. Assert Step Linear & Ambil Next Step
  v_next_step := public.fn_assert_linear_step(
    p_form_id => p_form_id
  );

  -- 4. Verifikasi Keberadaan File via Helper Function
  v_file_exists := public.fn_verify_storage_object_owner(
    p_bucket_id => 'SPMB',
    p_file_path => p_file_path,
    p_owner_id  => v_owner_user_id
  );

  if not v_file_exists then
    raise exception 'Berkas bukti pembayaran tidak ditemukan atau tidak valid.'
      using errcode = '45000';
  end if;

  -- 5. Simpan Data Pembayaran
  insert into public.pembayaran (id, bukti_pembayaran_url)
  values (p_form_id, p_file_path);

  -- 6. Update Form Pendaftaran
  update public.form_pendaftaran
  set step_id = v_next_step, updated_at = now()
  where id = p_form_id and pendaftar_id = v_owner_user_id;

  -- Prevent Silent Failure
  if not found then
    raise exception 'Gagal memperbarui status formulir pendaftaran.' 
      using errcode = '40000';
  end if;

  -- 7. Return JSON Response
  return jsonb_build_object(
    'success', true,
    'form_id', p_form_id,
    'next_step_id', v_next_step
  );
end;
$$;

-- Hak Akses RPC
revoke execute on function public.fn_rpc_submit_pembayaran from public;
grant execute on function public.fn_rpc_submit_pembayaran to authenticated;