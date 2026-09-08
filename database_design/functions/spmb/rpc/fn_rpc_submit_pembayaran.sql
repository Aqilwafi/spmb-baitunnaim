create or replace function public.fn_rpc_submit_pembayaran(
  p_form_id   uuid,
  p_file_path text
)
returns jsonb
language plpgsql
volatile
security definer -- Penting agar query ke storage.objects & table internal berjalan aman
set search_path = public, storage
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

  -- 4. Verifikasi Keberadaan File di Storage Supabase
  select exists (
    select 1 from storage.objects
    where bucket_id = 'SPMB'
      and name = p_file_path
      and owner = v_owner_user_id
  ) into v_file_exists;

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

  -- 7. Return JSON Response (Menggunakan nama variabel yang benar)
  return jsonb_build_object(
    'success', true,
    'form_id', p_form_id,
    'next_step_id', v_next_step
  );
end;
$$;

-- Hak Akses
revoke execute on function public.fn_rpc_submit_pembayaran(uuid, text) from public;
grant execute on function public.fn_rpc_submit_pembayaran(uuid, text) to authenticated;