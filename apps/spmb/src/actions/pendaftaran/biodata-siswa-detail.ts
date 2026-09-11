"use server";

import { revalidatePath } from "next/cache";
import { processSubmitBiodataSiswaDetail } from "@/features/pendaftaran/biodata-siswa-detail";

export async function submitBiodataSiswaDetailAction(input: any) {
  try {
    const result = await processSubmitBiodataSiswaDetail({
      formId: input.formId,
      rawPayload: input.rawPayload,
    });

    // 🔴 CEK JIKA RESULT GAGAL
    if (!result.success) {
      let fieldErrors: Record<string, string[]> | undefined = undefined;

      if (result.code === "23505" || result.message?.toLowerCase().includes("nisn")) {
        fieldErrors = { nisn: ["NISN sudah terdaftar dalam sistem."] };
      }

      return {
        success: false,
        message: result.message || "Gagal menyimpan biodata siswa detail.",
        errors: fieldErrors,
      };
    }

    // 🟢 HANYA DILAKUKAN JIKA BENAR-BENAR SUKSES
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Biodata siswa detail berhasil disimpan.",
      data: { nextStep: result.nextStep ?? 0 },
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Terjadi kesalahan sistem.",
    };
  }
}