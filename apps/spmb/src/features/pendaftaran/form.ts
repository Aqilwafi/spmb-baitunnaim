// features/pendaftaran/form-pendaftaran.ts

import type { AppSupabaseClient } from '@bn/supabase';
import { getCurrentUser } from "@bn/auth";
import { checkUserAccess } from "@/utils/guards";
import { initFormSchema } from "@bn/validators";

export type InitFormPendaftaranResult =
  | { success: true; message: string; data: { id: string } }
  | { success: false; message: string };

export async function executeInitFormPendaftaran(
  supabase: AppSupabaseClient,
  payload: Record<string, FormDataEntryValue>
): Promise<InitFormPendaftaranResult> {
  if (!(await checkUserAccess())) {
    return { success: false, message: "Akses tidak diizinkan." };
  }

  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, message: "Sesi pengguna tidak ditemukan, silakan login ulang." };
  }

  const parsed = initFormSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Data formulir tidak valid.";
    return { success: false, message: firstError };
  }

  try {
    // const result = await createNewRegistrationService(supabase, { userId: user.id, ...parsed.data });
    const newRegId = "12345"; // Contoh ID dari DB

    return { success: true, message: "Berhasil!", data: { id: newRegId } };
  } catch (error) {
    console.error("executeInitFormPendaftaran error:", error);
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}
