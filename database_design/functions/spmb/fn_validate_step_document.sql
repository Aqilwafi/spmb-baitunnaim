create or replace function fn_validate_step_document(
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

    select step_id
    into v_step_id
    from form_pendaftaran
    where id = p_form_id;

    if v_step_id is null then
        return null;
    end if;

    -- Ambil code step berdasarkan step_order
    select code 
    into v_step_code
    from master_step
    where id = v_step_id;

    -- Jika step tidak ditemukan, return null
    if v_step_code is null then
        return null;
    end if;

    -- 2. Tentukan mapping expected document type code berdasarkan step code
    v_expected_doc_code := case v_step_code
        when 'DOCUMENT_KK' then 'KK_TYPE_DOC'
        when 'DOCUMENT_KTP' then 'KTP_TYPE_DOC'
        when 'DOCUMENT_AKTE' then 'AKTE_TYPE_DOC'
        else null
    end;

    -- Jika tidak ada mapping atau perbandingan gagal (false), return null
    if v_expected_doc_code is null or upper(p_document_type_code) <> upper(v_expected_doc_code) then
        return null;
    end if;

    -- 3. Ambil id dari master_tipe_dokumen jika validasi true
    select id 
    into v_document_type_id
    from master_tipe_dokumen
    where upper(code) = upper(p_document_type_code);

    return v_document_type_id;
end;
$$;