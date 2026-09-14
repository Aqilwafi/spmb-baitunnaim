// @spmb features/pendaftaran/submit/biodata-keluarga.ts

import { checkUserAccess } from "@/features/auth/guards";
import { createValidationError } from "@bn/utils";
import type { ProcessFormPayload, FormSubmitResult} from "@/types/form.types";
import { biodataKeluargaFormSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { insertBiodataKeluarga } from "@/services/pendaftaran/mutasi/biodata-keluarga";

export async function submitBiodataKeluarga({formId, payload}: ProcessFormPayload): Promise<FormSubmitResult> {
  
  // 1. Guard Access
  if (!(await checkUserAccess())) {
    throw new Error("Akses tidak diizinkan.");
  }

  console.log('Features:', payload)

  const parsedFormId = formIdParamsSchema.safeParse(formId);
  
    if (!parsedFormId.success) {
      throw createValidationError(
        formatZodErrors(parsedFormId.error),
        parsedFormId.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
    }
  // if not wali, jangan panggil validasi, gimana?
    const parsedPayload = biodataKeluargaFormSchema.safeParse(payload);
  
    if (!parsedPayload.success) {
      throw createValidationError(
        formatZodErrors(parsedPayload.error),
        parsedPayload.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
    }

  return await insertBiodataKeluarga({
    formId: parsedFormId.data, 
    input: parsedPayload.data
  });
}