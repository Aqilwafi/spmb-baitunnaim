create or replace function public.fn_rpc_get_pembayaran_data(
  p_form_id uuid
)
returns table (
  bukti_pembayaran_url text,
  payment_status payment_status_enum,
  created_at timestamptz,
  verified_at timestamptz,
  verified_by varchar
)
language sql
stable
set search_path = public
as $$
  select
    p.bukti_pembayaran_url,
    p.payment_status,
    p.created_at,
    p.verified_at,
    case 
      when p.verified_by is not null then 'verifikator'
      else null
    end as verified_by
  from form_pendaftaran fp
  left join pembayaran p on p.id = fp.id and p.deleted_at is null
  where fp.id = p_form_id
    and fp.tahun_ajaran_id = public.fn_get_active_tahun_ajaran_id()
    and fp.pendaftar_id = auth.uid()
    and fp.deleted_at is null;
$$;

revoke execute on function public.fn_rpc_get_pembayaran_data from public;
grant execute on function public.fn_rpc_get_pembayaran_data to authenticated;