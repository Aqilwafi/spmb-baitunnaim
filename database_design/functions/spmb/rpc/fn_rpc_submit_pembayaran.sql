create or replace function public.fn_rpc_submit_pembayaran(
  p_form_id   uuid,
  p_file_path text,
  p_step_id   smallint
)
returns jsonb
language plpgsql
volatile
set search_path = public, storage
as $$
declare
  v_owner_user_id uuid := auth.uid();
  v_file_exists   boolean;
  v_next_step     smallint;
begin
  if v_owner_user_id is null then
    raise exception 'Unauthorized' using errcode = '28000';
  end if;

  v_next_step := public.fn_assert_linear_step(
    p_form_id      => p_form_id,
    p_current_step => p_step_id
  );

  select exists (
    select 1 from storage.objects
    where bucket_id = 'pembayaran-private'
      and name = p_file_path
      and owner = v_owner_user_id
  ) into v_file_exists;

  if not v_file_exists then
    raise exception 'Berkas bukti pembayaran tidak ditemukan atau tidak valid.'
      using errcode = '45000';
  end if;

  insert into public.pembayaran (id, bukti_pembayaran_url)
  values (p_form_id, p_file_path);

  update public.form_pendaftaran
  set step_id = v_next_step, updated_at = now()
  where id = p_form_id and pendaftar_id = v_owner_user_id;

  return jsonb_build_object('success', true, 'next_step', v_next_step);
end;
$$;

revoke execute on function public.fn_rpc_submit_pembayaran from public;
grant execute on function public.fn_rpc_submit_pembayaran to authenticated;