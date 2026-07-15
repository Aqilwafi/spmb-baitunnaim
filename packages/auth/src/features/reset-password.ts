// packages/auth/src/features/reset-password.ts

import { resetPasswordSchema } from "../validators/reset-password.schema";
import {
  getCurrentUser,
  updateUserPassword,
  signOutCurrentSession,
} from "../services/reset-password";
import { ResetPasswordPayload, ResetPasswordResponse } from "@bn/types";

export async function executeSharedResetPassword(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> {
  const parsed = resetPasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak memenuhi syarat keamanan.",
      error: { code: "VALIDATION_ERROR" },
    };
  }

  const {
    data: { user },
    error: userError,
  } = await getCurrentUser();

  if (userError || !user) {
    return {
      success: false,
      message:
        "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda.",
      error: { code: "SESSION_EXPIRED" },
    };
  }

  const { error } = await updateUserPassword(parsed.data.newPassword);

  if (error) {
    console.error("Shared Update Password Error:", error.message);
    return {
      success: false,
      message: "Gagal memperbarui password. Silakan coba lagi.",
      error: { code: "UPDATE_PASSWORD_FAILED" },
    };
  }

  // Invalidate sesi ini setelah berhasil -- cegah sesi lama dipakai
  // ganti password lagi tanpa link baru.
  await signOutCurrentSession();

  return {
    success: true,
    message: "Password Anda berhasil diperbarui. Silakan login dengan password baru.",
  };
}