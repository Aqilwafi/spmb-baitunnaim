// spmb @/features/form/init.ts

import { checkUserAccess } from "@/features/auth/guards";
import { initFormSchema, formatZodErrors } from "@bn/validators";
import { insertInitForm } from "@/services/pendaftaran/init";
import { getTahunAjaranAktif } from "../../master/tahun-ajaran";
import { mapInitFormPayload } from "../../../helpers/mappers";
import { pickId, createValidationError } from "@bn/utils";
import type { FormSubmitResult } from '@bn/types';

// 1. Disesuaikan dengan InitFormStepData dari Service (menggunakan camelCase)
export async function submitInitForm(payload: Record<string, FormDataEntryValue>): Promise<FormSubmitResult> {
  // 1. Guard Access
  if (!(await checkUserAccess())) {
    throw new Error("Akses tidak diizinkan.");
  }

  // 2. Validasi Zod
  const parsed = initFormSchema.safeParse(mapInitFormPayload(payload));
  if (!parsed.success) {
    throw createValidationError(
      formatZodErrors(parsed.error),
      parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  // 3. Logika Bisnis
  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) {
    throw new Error("Tahun ajaran aktif tidak ditemukan.");
  }

  // 4. Oper ke Service Layer
  return await insertInitForm(parsed.data);
}