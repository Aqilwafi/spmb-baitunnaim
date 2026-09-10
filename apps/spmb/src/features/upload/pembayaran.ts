import { submitPembayaran } from "@/services/pembayaran";
import { deleteBuktiBayarService } from "@/services/pembayaran-upload"; 

interface SubmitPembayaranFeaturesInput {
  formId: string;
  filePath: string;
}

export async function submitPembayaranFeatures(
  input: SubmitPembayaranFeaturesInput,
): Promise<{ success: boolean; nextStep?: number; error?: string }> {
  try {
    const step_id = 2;
    const result = await submitPembayaran({ ...input, stepId: step_id });

    return { success: true, nextStep: result.nextStep };
  } catch (err) {
    await deleteBuktiBayarService(input.filePath);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal mengirim bukti pembayaran.",
    };
  }
}