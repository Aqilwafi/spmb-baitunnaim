// apps/spmb/src/actions/pembayaran-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import { submitPembayaran } from "@/features/pendaftaran/submit/pembayaran";
import type { BaseResponse } from "@bn/types";
import type { FormSubmitResult, ProcessDocumentPayload } from "@/types/form.types";

export async function pembayaranAction({formId, filePath}: ProcessDocumentPayload): Promise<BaseResponse<FormSubmitResult>> {
  try {
    const result = await submitPembayaran({
      formId: formId,
      filePath: filePath,
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