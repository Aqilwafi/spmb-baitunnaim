"use server";

import { revalidatePath } from "next/cache";

export interface SubmitBiodataKeluargaPayload {
  formId: string;
  rawPayload: Record<string, any>;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitBiodataAyahAction({
  formId,
  rawPayload,
}: SubmitBiodataKeluargaPayload): Promise<ActionResult> {
  // Simulasi network delay (database operation)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("=== [DUMMY SERVER ACTION] Request Received ===");
  console.log("Form ID (Pendaftaran ID):", formId);
  console.log("Payload:", rawPayload);

  // 1. Penanganan jika Wali Dilewati (Skipped)
  if (rawPayload.is_skipped === "true") {
    console.log("-> Processing: Skip Wali Step");
    
    // Simulasi revalidate cache halaman pendaftaran
    revalidatePath(`/pendaftaran/${formId}`);

    return {
      success: true,
      message: "Data wali berhasil dilewati.",
    };
  }

  // 2. Simulasi Validasi Sederhana
  const errors: Record<string, string[]> = {};

  if (!rawPayload.nama_lengkap || String(rawPayload.nama_lengkap).trim() === "") {
    errors.nama_lengkap = ["Nama lengkap wajib diisi."];
  }

  // Validasi Tambahan jika Status Keberadaan "HIDUP"
  if (rawPayload.status_hidup === "HIDUP") {
    if (!rawPayload.nik) {
      errors.nik = ["NIK wajib diisi jika status hidup."];
    } else if (String(rawPayload.nik).length !== 16) {
      errors.nik = ["NIK harus berjumlah 16 digit."];
    }

    if (!rawPayload.no_hp) {
      errors.no_hp = ["Nomor HP/WhatsApp wajib diisi."];
    }

    if (!rawPayload.tempat_lahir) {
      errors.tempat_lahir = ["Tempat lahir wajib diisi."];
    }

    if (!rawPayload.tanggal_lahir) {
      errors.tanggal_lahir = ["Tanggal lahir wajib diisi."];
    }
  }

  // Validasi khusus WALI (harus melengkapi detail hubungan)
  if (rawPayload.relation_type === "WALI" && !rawPayload.detail_relation_type) {
    errors.detail_relation_type = ["Detail hubungan wali wajib diisi (misal: Kakek, Paman)."];
  }

  // Jika ada error validasi, kembalikan response error
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Terdapat kesalahan pada pengisian formulir. Silakan periksa kembali.",
      errors,
    };
  }

  // 3. Simulasi Simpan ke Database Berhasil
  console.log("-> Success: Data biodata keluarga berhasil disimpan.");

  // Revalidate cache agar UI langsung ter-update ke status 'complete'
  revalidatePath(`/pendaftaran/${formId}`);

  return {
    success: true,
    message: `Biodata ${rawPayload.relation_type} berhasil disimpan!`,
  };
}