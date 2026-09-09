import { resetPasswordSchema } from "../validators/reset-password.schema";
import {
  getCurrentUser,
  updateUserPassword,
  signOutCurrentSession,
} from "../services/reset-password";
import { ResetPasswordPayload, ResetPasswordResponse } from "@bn/types";
import { formatZodErrors } from "@bn/validators"; // Helper Zod terpisah

export async function executeSharedResetPassword(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> {
  // 1. Validasi Zod (Termasuk matching newPassword & confirmNewPassword via .refine)
  const parsed = resetPasswordSchema.safeParse(payload);
  
  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi form gagal. Silakan periksa kembali input password Anda.",
      errors: formatZodErrors(parsed.error), // 👈 Mengisi state.errors.newPassword & confirmNewPassword
      error: { code: "VALIDATION_ERROR" },
    };
  }

  // 2. Eksekusi Service
  try {
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

    // Invalidate sesi recovery setelah berhasil
    await signOutCurrentSession();

    return {
      success: true,
      message: "Password Anda berhasil diperbarui. Silakan login dengan password baru.",
    };
  } catch (err: any) {
    console.error("Reset Password Exception:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat memperbarui password.",
      error: { code: "INTERNAL_SERVER_ERROR" },
    };
  }
}