create or replace function public.fn_rpc_get_form_detail(
  p_form_id uuid
)
returns table (
  id uuid,
  step_id smallint,
  pendaftar_id uuid
)
language sql
stable
set search_path = public
as $$
  select
    fp.id,
    fp.step_id,
    fp.pendaftar_id
  from form_pendaftaran fp
  where fp.id = p_form_id
    and fp.pendaftar_id = auth.uid()
    and fp.tahun_ajaran_id = public.fn_get_active_tahun_ajaran_id()
    and fp.deleted_at is null;
$$;

revoke execute on function public.fn_rpc_get_form_detail(uuid) from public;
grant execute on function public.fn_rpc_get_form_detail(uuid) to authenticated;