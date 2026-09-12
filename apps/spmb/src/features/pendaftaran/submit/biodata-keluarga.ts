
import type { FormSubmitResult } from "@bn/types";
import { checkUserAccess } from "@/features/auth/guards";
import { createValidationError } from "@bn/utils";
import type { ProcessFormInput } from "@/types/form.types";
import { biodataKeluargaFormSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { insertBiodataKeluarga } from "@/services/pendaftaran/biodata-keluarga";

export async function submitBiodataKeluarga(input: ProcessFormInput): Promise<FormSubmitResult> {
  
  // 1. Guard Access
  if (!(await checkUserAccess())) {
    throw new Error("Akses tidak diizinkan.");
  }

  const parsedFormId = formIdParamsSchema.safeParse(input.formId);
  
    if (!parsedFormId.success) {
      throw createValidationError(
        formatZodErrors(parsedFormId.error),
        parsedFormId.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
    }
  
    const parsedPayload = biodataKeluargaFormSchema.safeParse(input.payload);
  
    if (!parsedPayload.success) {
      throw createValidationError(
        formatZodErrors(parsedPayload.error),
        parsedPayload.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
    }

  return await insertBiodataKeluarga(parsedFormId.data, parsedPayload.data)
}