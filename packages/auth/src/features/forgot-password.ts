// packages/auth/src/features/forgot-password.ts

import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { resetPasswordForEmail } from "../services/forgot-password";
import { ForgotPasswordPayload, ForgotPasswordResponse } from "@bn/types";

const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.";

export async function executeSharedForgotPassword(
  payload: ForgotPasswordPayload,
  siteUrl: string, // diinject dari caller, bukan baca env var sendiri
): Promise<ForgotPasswordResponse> {
  const parsed = forgotPasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: "Format email tidak valid.",
      data: { email: payload.email },
      error: { code: "VALIDATION_ERROR" },
    };
  }

  const { error } = await resetPasswordForEmail(parsed.data.email, siteUrl);

  if (error) {
    console.error("Shared Forgot Password Error:", error.message);
  }

  // Selalu return success (generic message) walau ada error di Supabase,
  // untuk mencegah user enumeration.
  return {
    success: true,
    message: GENERIC_FORGOT_PASSWORD_MESSAGE,
  };
}