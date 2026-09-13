// apps/spmb/src/services/dokumen.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { DokumenUploadPathInput } from "@bn/validators";
import type { FormSubmitResult } from '@/types/form.types'
import type { BaseRPCSubmitResponse, BaseRPCParams } from "@/types/rpc.types";

interface RPCParams extends BaseRPCParams {
    input: DokumenUploadPathInput;
}

export async function insertDokumen({formId, input}: RPCParams): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc('fn_rpc_submit_dokumen', {
    p_form_id: formId,
    p_file_path: input.filePath,
    p_document_type_code: input.jenisDokumen,
  });

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}