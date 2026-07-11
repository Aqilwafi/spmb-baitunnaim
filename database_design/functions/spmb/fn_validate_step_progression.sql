create or replace function public.fn_validate_step_progression()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- tidak boleh mundur
  if new.step_id < old.step_id then
    raise exception 'Pendaftaran tidak dapat dikembalikan ke langkah sebelumnya.';
  end if;

  -- tidak boleh lompat
  if new.step_id > old.step_id + 1 then
    raise exception 'Langkah tidak berurutan.';
  end if;

  -- masuk step dokumen
  if new.step_id = 7 and old.step_id = 6 then
      perform public.fn_validate_guardian_requirement(
          new.biodata_siswa_id
      );
  end if;

  return new;
end;
$$;