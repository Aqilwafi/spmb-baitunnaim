create or replace function public.fn_assert_linear_step(
  p_form_id         uuid,
  p_current_step    smallint,
  p_tahun_ajaran_id smallint default null
)
returns smallint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_db_step        smallint;
  v_owner          uuid;
  v_user_id        uuid := auth.uid();
  v_min_order      smallint;
  v_current_order  smallint;
  v_next_step      smallint;
  v_is_first_step  boolean;
begin
  if v_user_id is null then
    raise exception 'Akses ditolak.' using errcode = '28000';
  end if;

  -- 1 query untuk ambil step_order sekaligus cek eksistensi
  select step_order into v_current_order
  from public.master_step
  where id = p_current_step and is_active = true;

  if not found then
    raise exception 'Step tidak dikenali.' using errcode = '40005';
  end if;

  select min(step_order) into v_min_order
  from public.master_step
  where is_active = true;

  v_is_first_step := (v_current_order = v_min_order);

  if v_is_first_step then
    if exists (
      select 1 from public.form_pendaftaran
      where pendaftar_id = v_user_id
        and tahun_ajaran_id = p_tahun_ajaran_id
        and deleted_at is null
    ) then
      raise exception 'Anda sudah memiliki pendaftaran aktif pada tahun ajaran ini.'
        using errcode = '40002';
    end if;
  else
    if p_form_id is null then
      raise exception 'Form ID wajib diisi.' using errcode = '40000';
    end if;

    select step_id, pendaftar_id into v_db_step, v_owner
    from public.form_pendaftaran
    where id = p_form_id and deleted_at is null;

    if not found then
      raise exception 'Formulir tidak ditemukan.' using errcode = '40400';
    end if;

    if v_owner <> v_user_id then
      raise exception 'Akses ditolak.' using errcode = '28000';
    end if;

    if v_db_step <> p_current_step then
      raise exception 'Langkah pendaftaran tidak sesuai. Anda berada di step %', v_db_step
        using errcode = 'BN406';
    end if;
  end if;

  select id into v_next_step
  from public.master_step
  where step_order > v_current_order and is_active = true
  order by step_order asc
  limit 1;

  if not found then
    raise exception 'Tidak ada step berikutnya (sudah step terakhir).' using errcode = '40004';
  end if;

  return v_next_step;
end;
$$;

revoke execute on function public.fn_assert_linear_step from public;
grant execute on function public.fn_assert_linear_step to authenticated;