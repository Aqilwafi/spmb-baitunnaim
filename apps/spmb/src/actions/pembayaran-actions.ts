// apps/spmb/src/actions/pembayaran-actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { submitPembayaranFeatures } from "@/features/upload/pembayaran";
import type { ActionResponse } from "@bn/types";

interface SubmitPembayaranActionInput {
  formId: string;
  filePath: string;
}

export interface SubmitPembayaranActionData {
  nextStep: number;
}

export async function submitPembayaranAction(
  input: SubmitPembayaranActionInput
): Promise<ActionResponse<SubmitPembayaranActionData>> {
  try {
    const result = await submitPembayaranFeatures({
    formId: input.formId,
    filePath: input.filePath,
  });

  if (!result.success || result.nextStep === undefined) {
    return {
      success: false,
      message: result.error ?? "Gagal mengirim bukti pembayaran.",
      error: {
        code: "SUBMIT_PEMBAYARAN_FAILED",
        details: result.error,
      },
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Bukti pembayaran berhasil dikirim.",
    data: { nextStep: result.nextStep },
  };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal mengirim bukti pembayaran.",
      error: {
        code: "SUBMIT_PEMBAYARAN_FAILED",
        details: err instanceof Error ? err.message : err,
      },
    };
  }
}