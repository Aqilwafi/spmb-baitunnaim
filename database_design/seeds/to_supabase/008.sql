create or replace function public.fn_rpc_is_guardian_required(
    p_biodata_siswa_id uuid
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
    v_father_alive boolean;
    v_mother_alive boolean;
begin
    select
        max(case when hubungan = 'AYAH' then status_hidup end),
        max(case when hubungan = 'IBU' then status_hidup end)
    into
        v_father_alive,
        v_mother_alive
    from public.biodata_keluarga
    where biodata_siswa_id = p_biodata_siswa_id;

    return
        coalesce(v_father_alive, true) = false
        and
        coalesce(v_mother_alive, true) = false;
end;
$$;

create or replace function public.fn_validate_guardian_requirement(
    p_biodata_siswa_id uuid
)
returns void
language plpgsql
set search_path = public
as $$
declare
    v_guardian_exists boolean;
begin
    -- jika wali tidak diwajibkan, langsung lolos
    if not public.fn_rpc_is_guardian_required(p_biodata_siswa_id) then
        return;
    end if;

    -- pastikan data wali sudah ada
    select exists (
        select 1
        from public.biodata_keluarga
        where biodata_siswa_id = p_biodata_siswa_id
          and hubungan = 'WALI'
    )
    into v_guardian_exists;

    if not v_guardian_exists then
        raise exception 'Data wali wajib diisi karena ayah dan ibu telah meninggal.';
    end if;
end;
$$;

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

-- policies/spmb/rls_biodata_siswa.sql

alter table public.biodata_siswa enable row level security;

drop policy if exists "RLS: biodata_siswa: select"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: select"
on public.biodata_siswa
for select
using (
    public.fn_can_manage_spmb()
    or
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: insert"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: insert"
on public.biodata_siswa
for insert
with check (
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: update"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: update"
on public.biodata_siswa
for update  
using (
    public.fn_can_manage_spmb()
    or
    owner_user_id = auth.uid()
)
with check (
    public.fn_can_manage_spmb()
    or
    owner_user_id = auth.uid()
);

drop policy if exists "RLS: biodata_siswa: delete"
on public.biodata_siswa;

create policy "RLS: biodata_siswa: delete"
on public.biodata_siswa
for delete
using (false); -- tidak boleh delete biodata_siswa, harus delete user di auth.users sekalian 2 fungsi.

-- policies/spmb/rls_biodata_siswa_detail.sql

alter table public.biodata_siswa_detail enable row level security;

drop policy if exists "RLS: biodata_siswa_detail: select"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: select"
on public.biodata_siswa_detail
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: insert"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: insert"
on public.biodata_siswa_detail
for insert
with check (
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: update"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: update"
on public.biodata_siswa_detail
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(id)
);

drop policy if exists "RLS: biodata_siswa_detail: delete"
on public.biodata_siswa_detail;

create policy "RLS: biodata_siswa_detail: delete"
on public.biodata_siswa_detail
for delete
using (false); -- tidak boleh delete biodata_siswa_detail, harus delete user di auth.users sekalian 2 fungsi.

-- policies/spmb/rls_biodata_keluarga.sql

alter table public.biodata_keluarga enable row level security;

drop policy if exists "RLS: biodata_keluarga: select"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: select"
on public.biodata_keluarga
for select
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: insert"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: insert"
on public.biodata_keluarga
for insert
with check (
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: update"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: update"
on public.biodata_keluarga
for update  
using (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
)
with check (
    public.fn_can_manage_spmb()
    or
    public.fn_is_owner_siswa_data(biodata_siswa_id)
);

drop policy if exists "RLS: biodata_keluarga: delete"
on public.biodata_keluarga;

create policy "RLS: biodata_keluarga: delete"
on public.biodata_keluarga
for delete
using (false); -- tidak boleh delete biodata_keluarga, harus delete user di auth.users sekalian 2 fungsi.