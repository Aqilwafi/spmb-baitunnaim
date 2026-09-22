create or replace function public.fn_rpc_submit_finalisasi_form_pendaftaran(p_form_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_biodata_id uuid;
    v_is_pembayaran_ada boolean;
    v_is_dokumen_lengkap boolean;
    v_is_last_step boolean;
    begin
    -- 1. Ambil biodata_siswa_id berdasarkan form_pendaftaran
    select biodata_siswa_id into v_biodata_id
    from public.form_pendaftaran
    where id = p_form_id 
        and pendaftar_id = auth.uid()
        and registration_status = 'DRAFT';

    if not found then
        raise exception 'Pendaftaran tidak ditemukan atau sudah difinalisasi.';
    end if;

    -- 2. Cek apakah Biodata Utama & Detail sudah terisi
    if not exists (select 1 from public.biodata_siswa_detail where id = v_biodata_id) then
        raise exception 'Biodata detail siswa belum lengkap.';
    end if;

    -- 3. Cek apakah data Orang Tua / Keluarga minimal ada Ayah/Ibu
    if not exists (
        select 1 from public.biodata_keluarga 
        where biodata_siswa_id = v_biodata_id and relation_type in ('AYAH', 'IBU')
    ) then
        raise exception 'Data keluarga (Ayah/Ibu) wajib diisi.';
    end if;

    -- 4. Cek apakah bukti pembayaran formulir SUDAH DI-UPLOAD (tidak perlu menunggu VERIFIED)
    select exists (
        select 1 from public.pembayaran 
        where id = p_form_id and bukti_pembayaran_url is not null
    ) into v_is_pembayaran_ada;

    if not v_is_pembayaran_ada then
        raise exception 'Bukti pembayaran formulir belum diunggah.';
    end if;

    -- 5. Cek kelengkapan dokumen wajib (Pastikan ke-3 dokumen wajib SUDAH DI-UPLOAD)
    -- Status tidak harus VERIFIED, yang penting file-nya sudah di-submit oleh pendaftar
    select (count(distinct mtd.code) = 4) into v_is_dokumen_lengkap
    from public.dokumen d
    join public.master_tipe_dokumen mtd on mtd.id = d.tipe_dokumen_id
    where d.form_pendaftaran_id = p_form_id 
        and mtd.code in ('KK_TYPE_DOC', 'KTP_AYAH_TYPE_DOC', 'KTP_IBU_TYPE_DOC','AKTE_TYPE_DOC')
        and d.file_url is not null;

    if not v_is_dokumen_lengkap then
        raise exception 'Dokumen wajib (KK, KTP, Akte) belum lengkap diunggah.';
    end if;

    -- select from form_pendaftaran
    -- left join atau join master_step = fp.step_id
    -- bandingkan apakah step id sudah merupakan ms.step_order yang paling terkahir
    select (ms_current.step_order = ms_max.max_order) into v_is_last_step
    from public.form_pendaftaran fp
    join public.master_step ms_current on ms_current.id = fp.step_id
    cross join (
        select max(step_order) as max_order 
        from public.master_step
    ) ms_max
    where fp.id = p_form_id;
    
    -- 6. Update status pendaftaran menjadi SUBMITTED (siap direview admin)
    update public.form_pendaftaran
    set registration_status = 'FINALIZED',
        finalized_at = now(),
        finalized_by = auth.uid(),
        updated_at = now()
    where id = p_form_id;

    return jsonb_build_object(
        'success', true,
        'form_id', p_form_id
    );
end;
$$;

revoke execute on function public.fn_rpc_submit_finalisasi_form_pendaftaran from public;
grant execute on function public.fn_rpc_submit_finalisasi_form_pendaftaran to authenticated;