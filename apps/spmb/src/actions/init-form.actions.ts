"use server";

import { revalidatePath } from "next/cache";
import {
  executeInitFormPendaftaran,
  type InitFormPendaftaranResult,
} from "@/features/form/init";

export async function initFormPendaftaranAction(
  _prevState: any,
  formData: FormData
): Promise<InitFormPendaftaranResult> {
  const payload = Object.fromEntries(formData);

  const result = await executeInitFormPendaftaran(payload);

  if (!result.success) {
    return result;
  }

  revalidatePath("/dashboard");
  return result;
}