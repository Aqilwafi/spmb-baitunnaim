// spmg @/actions/init-form.actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { submitInitForm } from "@/features/pendaftaran/submit/init";
import { isValidationError } from "@bn/utils";
import type { BaseResponse} from "@bn/types";
import type { FormSubmitResult } from "@/types/form.types";

export async function initFormAction(
  _prevState: BaseResponse<FormSubmitResult> | null,
  formData: FormData
): Promise<BaseResponse<FormSubmitResult>> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const result = await submitInitForm({payload});

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