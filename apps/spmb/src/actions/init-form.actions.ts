"use server";

import { revalidatePath } from "next/cache";
import { executeInitFormStep } from "@/features/form/init";
import type { InitFormResult } from "@/services/init-form";
import type { ActionResponse } from "@bn/types";

export async function initFormPendaftaranAction(
  _prevState: ActionResponse<InitFormResult> | null,
  formData: FormData
): Promise<ActionResponse<InitFormResult>> {
  // 1. Ekstrak FormData ke plain object (properti sudah camelCase dari UI)
  const payload = Object.fromEntries(formData.entries());

  // 2. Oper ke layer Features
  const result = await executeInitFormStep(payload);

  // 3. Jika gagal (validasi/bisnis error), langsung kembalikan ke UI
  if (!result.success) {
    return result;
  }

  // 4. Jika sukses, lakukan cache revalidation
  revalidatePath("/dashboard");
  return result;
}