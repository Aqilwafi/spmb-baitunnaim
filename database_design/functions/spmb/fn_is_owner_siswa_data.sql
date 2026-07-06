create or replace function public.fn_is_owner_siswa_data(p_biodata_siswa_id uuid)
returns boolean
language sql
stable
security definer -- Wajib, agar bisa bypass RLS tabel biodata_siswa saat pengecekan
set search_path = public
as $$
  select exists (
    select 1 
    from public.biodata_siswa bs
    where bs.id = p_biodata_siswa_id 
      and bs.owner_user_id = auth.uid()
  );
$$;