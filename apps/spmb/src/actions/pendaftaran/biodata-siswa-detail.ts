"use server";

import { revalidatePath } from "next/cache";
import { processSubmitBiodataSiswaDetail } from "@/features/pendaftaran/biodata-siswa-detail";
import type { ActionResponse, FormSubmitResult } from "@bn/types";

export async function submitBiodataSiswaDetailAction(
  _prevState: ActionResponse<FormSubmitResult> | null,
  formData: FormData,
  formId: string,
): Promise<ActionResponse<FormSubmitResult>> {
  try {
    const result = await processSubmitBiodataSiswaDetail({
      formId: formId,
      rawPayload: formData,
    });

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

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Biodata siswa detail berhasil disimpan.",
      data: {
        formId,
        nextStepId: result.nextStep ?? 0,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Terjadi kesalahan sistem.",
    };
  }
}