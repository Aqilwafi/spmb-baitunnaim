
-- 2. Buat fungsi helper (pastikan menerima parameter boolean)
create or replace function public.fn_can_read_master_data(
    p_is_active boolean
)
returns boolean
language sql
stable
set search_path = public
as $$
    select
        public.fn_is_administrator()
        or 
        p_is_active = true
$$;

-- 3. Berikan hak akses fungsi dengan mencantumkan tipe parameternya (boolean)
revoke execute on function public.fn_can_read_master_data(boolean) from public;
grant execute on function public.fn_can_read_master_data(boolean) to anon, authenticated;
