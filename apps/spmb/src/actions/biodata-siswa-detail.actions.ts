"use server";

import { revalidatePath } from "next/cache";
import { processSubmitBiodataSiswaDetail } from "@/features/form/biodata-siswa-detail";
import type { ActionResponse } from "@bn/types";

interface SubmitBiodataSiswaDetailActionInput {
  formId: string;
  // stepId dihapus
  rawPayload: unknown;
}

interface SubmitBiodataSiswaDetailActionData {
  nextStep: number;
}

export async function submitBiodataSiswaDetailAction(
  input: SubmitBiodataSiswaDetailActionInput
): Promise<ActionResponse<SubmitBiodataSiswaDetailActionData>> {
  try {
    const result = await processSubmitBiodataSiswaDetail({
      formId: input.formId,
      rawPayload: input.rawPayload,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Biodata siswa detail berhasil disimpan.",
      data: { nextStep: result.nextStep ?? 0},
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal menyimpan biodata siswa detail.",
      error: {
        code: "SUBMIT_BIODATA_SISWA_DETAIL_FAILED",
        details: err instanceof Error ? err.message : err,
      },
    };
  }
}