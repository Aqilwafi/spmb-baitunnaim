// apps/spmb/src/actions/pembayaran-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import { submitPembayaran } from "@/features/pendaftaran/submit/pembayaran";
import type { ActionResponse, FormSubmitResult } from "@bn/types";

export interface PembayaranActionInput {
  formId: string;
  filePath: string;
}

export async function pembayaranAction(
  input: PembayaranActionInput
): Promise<ActionResponse<FormSubmitResult>> {
  try {
    const result = await submitPembayaran({
      formId: input.formId,
      filePath: input.filePath,
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