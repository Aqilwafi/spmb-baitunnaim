"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { createNewRegistrationService } from "@/services/servicePendaftaran";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function initRegistrationAction(formData: FormData) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Autentikasi diperlukan.");

  const payload = {
    userId: user.id,
    namaLengkap: formData.get("nama_lengkap") as string,
    jenisKelamin: formData.get("jenis_kelamin") as string,
    lembagaId: Number(formData.get("lembaga_tujuan_id")),
    kelasId: Number(formData.get("kelas_mi_id")),
  };

  // Validasi dasar server-side
  if (!payload.namaLengkap || !payload.lembagaId || !payload.kelasId) {
    throw new Error("Data formulir tidak valid.");
  }

  let newRegId: string;

  try {
    const newReg = await createNewRegistrationService(payload);
    newRegId = newReg.id;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Gagal memproses pendaftaran");
  }

  // Penting: Revalidate sebelum redirect
  revalidatePath("/dashboard");
  redirect(`/dashboard/pendaftaran/${newRegId}`);
}