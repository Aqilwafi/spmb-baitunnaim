create or replace function public.fn_is_owner_form_data(p_form_pendaftaran_id uuid)
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1 
    from public.form_pendaftaran fp
    where fp.id = p_form_pendaftaran_id 
      and fp.pendaftar_id = auth.uid()
  );
$$;