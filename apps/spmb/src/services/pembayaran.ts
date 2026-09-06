// apps/spmb/src/services/pembayaran.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export interface SubmitPembayaranParams {
  formId: string;
  filePath: string;
  stepId: number;
}

export interface SubmitPembayaranResult {
  success: boolean;
  nextStep: number;
}

/**
 * Memanggil RPC fn_rpc_submit_pembayaran.
 * TIDAK melakukan authorization/ownership check di sini —
 * seluruhnya sudah ditangani oleh fn_assert_linear_step di dalam RPC.
 */
export async function submitPembayaran(
  params: SubmitPembayaranParams
): Promise<SubmitPembayaranResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_pembayaran", {
    p_form_id: params.formId,
    p_file_path: params.filePath,
    p_step_id: params.stepId,
  });

  if (error) {
    throw new Error(error.message);
  }

  // RPC return type di-generate sebagai `Json` karena SQL function return jsonb.
  // Bentuk aktualnya sudah pasti { success: boolean, next_step: number }
  // sesuai definisi fn_rpc_submit_pembayaran — assert di sini.
  const result = data as { success: boolean; next_step: number };

  return {
    success: result.success,
    nextStep: result.next_step,
  };
}