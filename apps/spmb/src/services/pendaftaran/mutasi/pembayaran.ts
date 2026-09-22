// apps/spmb/src/services/pembayaran.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { FormSubmitResult } from '@/types/form.types';
import type { PembayaranUploadPathInput } from "@bn/validators";
import type { BaseRPCSubmitResponse, BaseRPCParams} from "@bn/types";

interface RPCParams extends BaseRPCParams {
  input: PembayaranUploadPathInput;
}

export async function insertPembayaran({formId, input}: RPCParams): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_pembayaran", {
    p_form_id: formId,
    p_file_path: input.filePath,
  });

  if (error) throw error;
  

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}