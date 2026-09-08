create or replace function public.fn_assert_linear_step(
  p_form_id uuid default null
)
returns smallint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id            uuid := auth.uid();
  v_ta_aktif_id        smallint;
  v_owner              uuid;
  v_db_step_id         smallint;
  v_current_step_order smallint;
  v_min_step_order     smallint;
  v_next_step_id       smallint;
begin
  -- 1. Cek autentikasi user
  if v_user_id is null then
    raise exception 'Akses ditolak.' using errcode = '28000';
  end if;

  -- 2. Ambil Tahun Ajaran Aktif
  select id into v_ta_aktif_id
  from public.master_tahun_ajaran
  where is_active = true;

  if not found then
    raise exception 'Tahun ajaran aktif tidak ditemukan.' using errcode = '40005';
  end if;

  -- 3. Ambil step order pertama
  select min(step_order) into v_min_step_order
  from public.master_step
  where is_active = true;

  -- 4. Cabang Logika berdasarkan ketersediaan p_form_id
  if p_form_id is null then
    -- Skenario 1: User membuat formulir BARU (Mulai dari Step Pertama)
    v_current_step_order := v_min_step_order;

    /* NOTE:
       Pengecekan eksistensi form DIHAPUS agar user bisa buat > 1 form.
       Jika ada batasan maksimal form per user, taruh query validasi kuota di sini.
    */

  else
    -- Skenario 2: User melanjutkan formulir SPESIFIK yang sudah ada
    select step_id, pendaftar_id into v_db_step_id, v_owner
    from public.form_pendaftaran
    where id = p_form_id
      and tahun_ajaran_id = v_ta_aktif_id
      and deleted_at is null;

    if not found then
      raise exception 'Formulir tidak ditemukan.' using errcode = '40400';
    end if;

    if v_owner <> v_user_id then
      raise exception 'Akses ditolak.' using errcode = '28000';
    end if;

    -- Ambil step_order berdasarkan step_id yang tersimpan di DB
    select step_order into v_current_step_order
    from public.master_step
    where id = v_db_step_id and is_active = true;

    if not found then
      raise exception 'Step pendaftaran saat ini tidak valid atau tidak aktif.' using errcode = '40005';
    end if;
  end if;

  -- 5. Cari Step Berikutnya
  select id into v_next_step_id
  from public.master_step
  where step_order > v_current_step_order 
    and is_active = true
  order by step_order asc
  limit 1;

  if not found then
    raise exception 'Tidak ada step berikutnya (sudah step terakhir).' using errcode = '40004';
  end if;

  return v_next_step_id;
end;
$$;

revoke execute on function public.fn_assert_linear_step(uuid) from public;
grant execute on function public.fn_assert_linear_step(uuid) to authenticated;