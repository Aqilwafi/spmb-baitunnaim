create or replace function public.fn_validate_step_progression()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old_order smallint;
  v_new_order smallint;
  v_old_code  varchar(50);
begin
  -- Hanya jalankan jika step_id berubah
  if new.step_id is distinct from old.step_id then
    
    -- Ambil order & code dari step LAMA
    select step_order, code into v_old_order, v_old_code 
    from public.master_step 
    where id = old.step_id;

    -- Ambil order dari step BARU
    select step_order into v_new_order 
    from public.master_step 
    where id = new.step_id;

    -- Validasi 1: Tidak boleh mundur
    if v_new_order < v_old_order then
      raise exception 'Pendaftaran tidak dapat dikembalikan ke langkah sebelumnya.'
        using errcode = 'BN400';
    end if;

    -- Validasi 2: Tidak boleh melompati step
    if v_new_order > v_old_order + 1 then
      raise exception 'Langkah pendaftaran tidak berurutan.'
        using errcode = 'BN400';
    end if;

    -- Validasi Khusus: Jika step sebelumnya adalah BIODATA_WALI
    if v_old_code = 'BIODATA_WALI' then
      perform public.fn_validate_guardian_requirement(new.biodata_siswa_id);
    end if;

  end if;

  return new;
end;
$$;

revoke execute on function public.fn_validate_step_progression() from public;