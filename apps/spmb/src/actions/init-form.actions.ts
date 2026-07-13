"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@bn/supabase";
import {
  executeInitFormPendaftaran,
  type InitFormPendaftaranResult,
} from "@/features/pendaftaran/form";

export async function initFormPendaftaranAction(
  prevState: any,
  formData: FormData
): Promise<InitFormPendaftaranResult> {
  const supabase = await createSupabaseServer();
  const payload = Object.fromEntries(formData);

  const result = await executeInitFormPendaftaran(supabase, payload);

  if (!result.success) {
    return result;
  }

  revalidatePath("/dashboard");
  return result;
}