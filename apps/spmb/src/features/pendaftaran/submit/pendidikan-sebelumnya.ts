
import type { FormSubmitResult } from "@bn/types";
import { createValidationError } from "@bn/utils";
import type { ProcessFormInput } from "@/types/form.types";
import { checkUserAccess } from "@/features/auth/guards";
import { pendidikanSebelumnyaFormSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { insertPendidikanSebelumnya } from "@/services/pendaftaran/pendidikan-sebelumnya";

export async function submitPendidikanSebelumnya(input: ProcessFormInput): Promise<FormSubmitResult> {

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

  const parsedPayload = pendidikanSebelumnyaFormSchema.safeParse(input.payload);

  if (!parsedPayload.success) {
    throw createValidationError(
      formatZodErrors(parsedPayload.error),
      parsedPayload.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  return insertPendidikanSebelumnya(parsedFormId.data, parsedPayload.data);
}