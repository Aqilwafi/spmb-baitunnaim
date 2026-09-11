// spmb @/features/form/init.ts

import { checkUserAccess } from "@/features/auth/guards";
import { initFormSchema, formIdParamsSchema, formatZodErrors} from "@bn/validators";
import {
  insertInitForm,
  getInitForm,
  type InitFormStepData as ServiceInitFormStepData,
} from "@/services/pendaftaran/init-form";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { mapInitFormPayload } from "../../helpers/mappers";
import { pickId, genderLabel, createValidationError } from "@bn/utils";
import type { FormSubmitResult } from '@bn/types';

// 1. Disesuaikan dengan InitFormStepData dari Service (menggunakan camelCase)
export type InitFormStepData = Omit<ServiceInitFormStepData, "gender"> & {
  genderFormatted: string;
};

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

export async function getInitFormData(
  formId: string
): Promise<InitFormStepData | null> {
  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) return null;

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) return null;

  const data = await getInitForm(parsed.data, tahunAjaranId);

  if (!data) return null;

  return {
    ...data,
    genderFormatted: genderLabel(data.gender),
  };
}