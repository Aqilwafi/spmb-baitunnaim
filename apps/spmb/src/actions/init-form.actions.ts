"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@bn/supabase";
import {
  executeInitFormPendaftaran,
  type InitFormPendaftaranResult,
} from "@/features/pendaftaran/init-form";

export async function initFormPendaftaranAction(
  prevState: any,
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