// apps/spmb/src/actions/pembayaran-actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { submitPembayaran } from "@/services/pembayaran";
import type { ActionResponse } from "@bn/types";

interface SubmitPembayaranActionInput {
  formId: string;
  filePath: string;
  stepId: number;
}

export interface SubmitPembayaranActionData {
  nextStep: number;
}

export async function submitPembayaranAction(
  input: SubmitPembayaranActionInput
): Promise<ActionResponse<SubmitPembayaranActionData>> {
  try {
    const result = await submitPembayaran({
      formId: input.formId,
      filePath: input.filePath,
      stepId: input.stepId,
    });

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