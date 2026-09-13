create or replace function public.fn_rpc_submit_dokumen(
    p_form_id           uuid,
    p_document_type_code text,
    p_file_path         text
)
returns jsonb
language plpgsql
volatile
security invoker
set search_path = public
as $$
declare
    v_owner_user_id     uuid := auth.uid();
    v_file_exists       boolean;
    v_next_step         smallint;
    v_tipe_dokumen_id   smallint;
begin
    -- 1. Cek Autentikasi
    if v_owner_user_id is null then
        raise exception 'Unauthorized' using errcode = '28000';
    end if;

    -- 2. Validasi Input Parameter
    if p_form_id is null or p_document_type_code is null or trim(p_document_type_code) = '' or p_file_path is null or trim(p_file_path) = '' then
        raise exception 'Form ID, document type code, dan file path wajib diisi.' using errcode = '40000';
    end if;

    -- 3. Assert Step Linear & Ambil Next Step
    v_next_step := public.fn_assert_linear_step(
        p_form_id => p_form_id
    );

    -- 4. Validasi Kesesuaian Step dengan Tipe Dokumen Sekaligus Ambil ID-nya
    v_tipe_dokumen_id := public.fn_validate_step_document(
        p_step_order => v_next_step,
        p_document_type_code => p_document_type_code
    );

    if v_tipe_dokumen_id is null then
        raise exception 'Tipe dokumen tidak sesuai dengan step pendaftaran saat ini.' using errcode = '40000';
    end if;

    -- 5. Verifikasi Keberadaan File via Helper Function
    v_file_exists := public.fn_verify_storage_object_owner(
        p_bucket_id => 'SPMB',
        p_file_path => p_file_path,
        p_owner_id  => v_owner_user_id
    );

    if not v_file_exists then
        raise exception 'Berkas dokumen tidak ditemukan atau tidak valid.'
            using errcode = '45000';
    end if;

    -- 6. Simpan / Update Dokumen (Upsert berdasarkan constraint unique form_pendaftaran_id + tipe_dokumen_id)
    insert into public.dokumen (
        form_pendaftaran_id,
        tipe_dokumen_id,
        file_url,
        document_status,
        uploaded_at,
        updated_at
    ) 
    values (
        p_form_id,
        v_tipe_dokumen_id,
        p_file_path,
        'SUBMITTED',
        now(),
        now()
    )
    on conflict (form_pendaftaran_id, tipe_dokumen_id) do update set
        file_url            = excluded.file_url,
        document_status     = 'SUBMITTED',
        catatan_verifikasi = null,
        verified_by         = null,
        verified_at         = null,
        uploaded_at         = now(),
        updated_at          = now();

    -- 7. Update Form Pendaftaran
    update public.form_pendaftaran
    set step_id = v_next_step, updated_at = now()
    where id = p_form_id and pendaftar_id = v_owner_user_id;

    -- Prevent Silent Failure
    if not found then
        raise exception 'Gagal memperbarui status formulir pendaftaran.' 
            using errcode = '40000';
    end if;

    -- 8. Return JSON Response
    return jsonb_build_object(
        'success', true,
        'form_id', p_form_id,
        'next_step_id', v_next_step
    );
end;
$$;

-- Hak Akses RPC
revoke execute on function public.fn_rpc_submit_dokumen from public;
grant execute on function public.fn_rpc_submit_dokumen to authenticated;