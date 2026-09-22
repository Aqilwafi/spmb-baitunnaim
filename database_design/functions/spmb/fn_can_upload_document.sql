create or replace function public.fn_can_upload_document(
    p_user_id uuid,
    p_folder_category text
)
returns boolean
language plpgsql
security definer
as $$
begin
    -- 1. Jika targetnya folder bukti-pembayaran
    if p_folder_category = 'bukti-pembayaran' then
        return exists (
            select 1 
            from public.form_pendaftaran fp
            join public.master_step ms on ms.id = fp.step_id
            where fp.pendaftar_id = p_user_id 
              and ms.code = 'PAYMENT'
        );
    end if;

    -- 2. Jika targetnya folder berkas-pendaftaran
    if p_folder_category = 'berkas-pendaftaran' then
        return exists (
            select 1 
            from public.form_pendaftaran fp
            join public.master_step ms on ms.id = fp.step_id
            where fp.pendaftar_id = p_user_id 
              and ms.code in (
                  'DOCUMENT_KK', 
                  'DOCUMENT_KTP_AYAH', 
                  'DOCUMENT_KTP_IBU', 
                  'DOCUMENT_AKTE'
              )
        );
    end if;

    return false;
end;
$$;

revoke execute on function public.fn_can_upload_document(uuid, text) from public;
grant execute on function public.fn_can_upload_document(uuid, text) to authenticated;