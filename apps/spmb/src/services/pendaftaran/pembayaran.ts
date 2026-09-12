// apps/spmb/src/services/pembayaran.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { ProcessDocumentUpload } from "@/types/form.types";
import type { BaseRPCSubmitResponse, FormSubmitResult } from "@bn/types";

export async function insertPembayaran(params: ProcessDocumentUpload): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_pembayaran", {
    p_form_id: params.formId,
    p_file_path: params.filePath,
  });

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}