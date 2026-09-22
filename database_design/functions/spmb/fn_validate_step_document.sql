create or replace function public.fn_validate_step_document(
    p_form_id uuid,
    p_document_type_code text
)
returns smallint
language plpgsql
as $$
declare
    v_step_code text;
    v_step_id smallint;
    v_expected_doc_code text;
    v_document_type_id smallint;
begin
    -- 1. Ambil step_id dari form_pendaftaran
    select step_id
    into v_step_id
    from public.form_pendaftaran
    where id = p_form_id;

    if v_step_id is null then
        return null;
    end if;

    -- Ambil code step berdasarkan step_id
    select code 
    into v_step_code
    from public.master_step
    where id = v_step_id;

    if v_step_code is null then
        return null;
    end if;

    -- 2. Mapping expected document_type_code berdasarkan step code pendaftaran
    v_expected_doc_code := case v_step_code
        when 'DOCUMENT_KK'       then 'KK_TYPE_DOC'
        when 'DOCUMENT_KTP_AYAH' then 'KTP_AYAH_TYPE_DOC'
        when 'DOCUMENT_KTP_IBU'  then 'KTP_IBU_TYPE_DOC'
        when 'DOCUMENT_AKTE'     then 'AKTE_TYPE_DOC'
        else null
    end;

    -- Jika step tidak membutuhkan dokumen atau kode dokumen yang dikirim tidak cocok, kembalikan null
    if v_expected_doc_code is null or upper(p_document_type_code) <> upper(v_expected_doc_code) then
        return null;
    end if;

    -- 3. Ambil ID dari master_tipe_dokumen jika validasi sukses
    select id 
    into v_document_type_id
    from public.master_tipe_dokumen
    where upper(code) = upper(p_document_type_code);

    return v_document_type_id;
end;
$$;

-- 2. Atur Ulang Hak Akses Execution
revoke execute on function public.fn_validate_step_document(uuid, text) from public;
grant execute on function public.fn_validate_step_document(uuid, text) to authenticated;