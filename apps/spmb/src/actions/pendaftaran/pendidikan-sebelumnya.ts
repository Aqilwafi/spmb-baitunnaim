"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import { submitPendidikanSebelumnya } from "@/features/pendaftaran/submit/pendidikan-sebelumnya";
import type { ActionResponse, FormSubmitResult } from "@bn/types";

export async function pendidikanSebelumnyaAction(
  _prevState: ActionResponse<FormSubmitResult> | null,
  formData: FormData,
  formId: string,
): Promise<ActionResponse<FormSubmitResult>> {
  
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