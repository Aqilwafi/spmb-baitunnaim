create or replace function public.fn_verify_storage_object_owner(
  p_bucket_id text,
  p_file_path text,
  p_owner_id  uuid
)
returns boolean
language plpgsql
set search_path = public, storage
as $$
begin
  return exists (
    select 1 
    from storage.objects
    where bucket_id = p_bucket_id
      and name = p_file_path
      and owner = p_owner_id
  );
end;
$$;

-- Cabut akses dari publik/authenticated agar fungsi internal ini tidak dipanggil langsung via RPC client
revoke execute on function public.fn_verify_storage_object_owner from public;
grant execute on function public.fn_verify_storage_object_owner from authenticated;