// @spmb features/pendaftaran/submit/biodata-siswa-detail.ts

import { createValidationError } from "@bn/utils";
import type { ProcessFormPayload, FormSubmitResult } from "@/types/form.types";
import { checkUserAccess } from "@/features/auth/guards";
import { biodataSiswaDetailSubmitSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { insertBiodataSiswaDetail } from "@/services/pendaftaran/mutasi/biodata-siswa-detail";

export async function submitBiodataSiswaDetail({formId, payload}: ProcessFormPayload): Promise<FormSubmitResult> {

  if (!(await checkUserAccess())) {
    throw new Error("Akses tidak diizinkan.");
  }

  const parsedFormId = formIdParamsSchema.safeParse(formId);

  if (!parsedFormId.success) {
    throw createValidationError(
      formatZodErrors(parsedFormId.error),
      parsedFormId.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  const parsedPayload = biodataSiswaDetailSubmitSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw createValidationError(
      formatZodErrors(parsedPayload.error),
      parsedPayload.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  return insertBiodataSiswaDetail({
    formId: parsedFormId.data,
    input: parsedPayload.data,
  });
}