"use server";

import { createSupabaseServer } from "@bn/supabase";
import { BaseResponse } from "@bn/types";
import { getCurrentUser } from '@bn/auth';
import { checkUserAccess } from "@/utils/guards";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message: string;
  data?: { id: string };
};

export async function initFormPendaftaranAction(prevState: any, formData: FormData): Promise<BaseResponse<{ id: string }, never>> {
  
  if (!checkUserAccess()) {
    return { success: false, message: "Akses tidak diizinkan." };
  }

  const user = await getCurrentUser();

  const supabase = await createSupabaseServer();

  const payload = {
    userId: user.data.id,
    namaLengkap: formData.get("nama_lengkap") as string,
    jenisKelamin: formData.get("jenis_kelamin") as string,
    lembagaId: Number(formData.get("lembaga_tujuan_id")),
    kelasId: Number(formData.get("kelas_mi_id")),
  };

  if (!payload.namaLengkap || !payload.lembagaId || !payload.kelasId) {
    return { success: false, message: "Data formulir tidak valid." };
  }

  try {
    // Simulasi pemanggilan service Anda
    // const result = await createNewRegistrationService(payload);
    const newRegId = "12345"; // Contoh ID dari DB

    revalidatePath("/dashboard");
    
    return { 
      success: true, 
      message: "Berhasil!",
      data: { id: newRegId }
    };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}