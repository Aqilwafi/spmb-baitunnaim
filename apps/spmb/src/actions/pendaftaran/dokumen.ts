// apps/spmb/src/actions/dokumen-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { isValidationError } from "@bn/utils";
import { submitDokumen } from "@/features/pendaftaran/submit/dokumen";
import type { ActionResponse } from "@bn/types";
import type { FormSubmitResult } from "@/types/form.types";
import type { ProcessDocumentFeaturePayload } from "@/features/pendaftaran/submit/dokumen";

export async function dokumenAction({ formId, filePath, jenisDokumen }: ProcessDocumentFeaturePayload): Promise<ActionResponse<FormSubmitResult>> {
  try {

    const result = await submitDokumen({
      formId,
      filePath,
      jenisDokumen,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Dokumen berhasil dikirim.",
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