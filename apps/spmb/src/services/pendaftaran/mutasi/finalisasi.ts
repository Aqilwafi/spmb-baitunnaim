// apps/spmb/src/services/pembayaran.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { FormSubmitResult } from '@/types/form.types';
import type { BaseRPCSubmitResponse, BaseRPCParams} from "@/types/rpc.types";

export async function insertFinalisasi({formId}: BaseRPCParams): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();
  console.log(formId)

  const { data, error } = await supabase.rpc('fn_rpc_submit_finalisasi_form_pendaftaran', {
    p_form_id: formId,
  });

  if (error) throw error;
  

  const result = data as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
  };
}