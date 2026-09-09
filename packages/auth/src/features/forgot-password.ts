import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { resetPasswordForEmail } from "../services/forgot-password";
import { isAdminEmail } from "../services/admin/check-email";
import { ForgotPasswordPayload, ForgotPasswordResponse } from "@bn/types";
import { formatZodErrors } from "@bn/validators"; // Helper Zod terpisah

const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.";

export async function executeSharedForgotPassword(
  payload: ForgotPasswordPayload,
  siteUrl: string,
): Promise<ForgotPasswordResponse> {
  // 1. Validasi Zod
  const parsed = forgotPasswordSchema.safeParse(payload);
  
  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi form gagal. Silakan periksa kembali email Anda.",
      errors: formatZodErrors(parsed.error), // 👈 Mengisi state.errors.email untuk UI
      error: { code: "VALIDATION_ERROR" },
      data: { email: payload.email || "" },
    };
  }

  // 2. Eksekusi Service
  try {
    const isAdmin = await isAdminEmail(parsed.data.email);

    if (!isAdmin) {
      const { error } = await resetPasswordForEmail(parsed.data.email, siteUrl);
      if (error) {
        console.error("Shared Forgot Password Error:", error.message);
      }
    }

    // Selalu kembalikan generic message demi keamanan
    return {
      success: true,
      message: GENERIC_FORGOT_PASSWORD_MESSAGE,
      data: { email: parsed.data.email }, // 👈 Mempertahankan value di input UI
    };
  } catch (err: any) {
    console.error("Forgot Password Exception:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat memproses permintaan Anda.",
      error: { code: "INTERNAL_SERVER_ERROR" },
      data: { email: parsed.data.email },
    };
  }
}