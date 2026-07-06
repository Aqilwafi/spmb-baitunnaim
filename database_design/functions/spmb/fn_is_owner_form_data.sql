create or replace function public.fn_is_owner_form_data(p_form_pendaftaran_id uuid)
returns boolean
language sql
stable
security definer -- Wajib, agar bisa melakukan join lintas tabel RLS
set search_path = public
as $$
  select exists (
    select 1 
    from public.form_pendaftaran fp
    join public.biodata_siswa bs on fp.biodata_siswa_id = bs.id
    where fp.id = p_form_pendaftaran_id 
      and bs.owner_user_id = auth.uid()
  );
$$;