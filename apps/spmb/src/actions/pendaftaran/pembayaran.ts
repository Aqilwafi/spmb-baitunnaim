// apps/spmb/src/actions/pembayaran-actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { submitPembayaran } from "@/features/pendaftaran/submit/pembayaran";
import { isValidationError } from "@bn/utils";
import type { ActionResponse, FormSubmitResult } from "@bn/types";

export async function pembayaranAction(
  _prevState: ActionResponse<FormSubmitResult> | null,
  formData: FormData
): Promise<ActionResponse<FormSubmitResult>> {
  try {
    const payload = {
      formId: formData.get("formId") as string,
      filePath: formData.get("filePath") as string,
    };

    const result = await submitPembayaran(payload);

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Bukti pembayaran berhasil dikirim.",
      data: result,
    };
  } catch (error) {
    // Handling error validasi Zod (termasuk formatZodErrors)
    if (isValidationError(error)) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    // Handling Standard JS Error / Server Error
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}