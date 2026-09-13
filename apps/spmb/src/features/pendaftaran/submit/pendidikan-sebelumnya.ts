

import { createValidationError } from "@bn/utils";
import type { ProcessFormPayload, FormSubmitResult } from "@/types/form.types";
import { checkUserAccess } from "@/features/auth/guards";
import { pendidikanSebelumnyaFormSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { insertPendidikanSebelumnya } from "@/services/pendaftaran/mutasi/pendidikan-sebelumnya";

export async function submitPendidikanSebelumnya({formId, payload}: ProcessFormPayload): Promise<FormSubmitResult> {

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

  const parsedPayload = pendidikanSebelumnyaFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw createValidationError(
      formatZodErrors(parsedPayload.error),
      parsedPayload.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  return insertPendidikanSebelumnya({
    formId: parsedFormId.data,
    input: parsedPayload.data
  });
}