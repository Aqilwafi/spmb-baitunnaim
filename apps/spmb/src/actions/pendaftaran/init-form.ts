// spmg @/actions/init-form.actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { submitInitForm } from "@/features/pendaftaran/init-form";
import { isValidationError } from "@bn/utils";
import type { ActionResponse, FormSubmitResult} from "@bn/types";

export async function initFormAction(
  _prevState: ActionResponse<FormSubmitResult> | null,
  formData: FormData
): Promise<ActionResponse<FormSubmitResult>> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const result = await submitInitForm(payload);

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Pendaftaran berhasil diinisialisasi.",
      data: result,
    };
  } catch (error) {
    // Check tipe error menggunakan Type Guard Function
    if (isValidationError(error)) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    // Untuk Standard JS Error / RPC Error
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}