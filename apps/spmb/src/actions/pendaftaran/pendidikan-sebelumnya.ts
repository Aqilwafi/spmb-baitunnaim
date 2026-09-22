"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import { submitPendidikanSebelumnya } from "@/features/pendaftaran/submit/pendidikan";
import type { BaseResponse } from "@bn/types";
import type { FormSubmitResult } from "@/types/form.types";

export async function pendidikanSebelumnyaAction(
  _prevState: BaseResponse<FormSubmitResult> | null,
  formData: FormData,
  formId: string,
): Promise<BaseResponse<FormSubmitResult>> {
  
  try {
    const payload = Object.fromEntries(formData.entries());
  
    const result = await submitPendidikanSebelumnya({
      formId: formId,
      payload: payload,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Biodata siswa detail berhasil disimpan.",
      data: result
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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}