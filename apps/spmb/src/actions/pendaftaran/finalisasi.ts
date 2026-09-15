// apps/spmb/src/actions/pembayaran-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import type { ActionResponse } from "@bn/types";
import type { FormSubmitResult } from "@/types/form.types";
import { BaseRPCParams } from "@/types/rpc.types";
import { submitFinalisasi } from "@/features/pendaftaran/submit/finalisasi";

export async function finalisasiPendaftaranAction({formId}: BaseRPCParams): Promise<ActionResponse<FormSubmitResult>> {
  try {
    const result = await submitFinalisasi({
      formId: formId,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Bukti pembayaran berhasil dikirim.",
      data: result,
    };
  } catch (error) {
    if (isValidationError(error)) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}