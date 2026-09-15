// spmb @/features/pendaftaran/submit/finalisasi.ts

import { createValidationError } from "@bn/utils";
import type { FormSubmitResult } from "@/types/form.types";
import { checkUserAccess } from "@/features/auth/guards";
import { formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { BaseRPCParams } from "@/types/rpc.types";
import { insertFinalisasi } from "@/services/pendaftaran/mutasi/finalisasi";

export async function submitFinalisasi({formId}: BaseRPCParams): Promise<FormSubmitResult> {

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

  return insertFinalisasi({
    formId: parsedFormId.data,
  });
}