create or replace function public.fn_get_active_tahun_ajaran_id()
returns smallint
language sql
stable
set search_path = public
as $$
  select id
  from master_tahun_ajaran
  where is_active = true
  limit 1;
$$;

revoke execute on function public.fn_get_active_tahun_ajaran_id from public;
grant execute on function public.fn_get_active_tahun_ajaran_id to authenticated, anon;