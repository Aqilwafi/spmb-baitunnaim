// packages/auth/src/services.ts
import { createSupabaseServer } from "@bn/supabase";
import { forgotPasswordSchema, resetPasswordSchema } from "@bn/validators";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@bn/types";

const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.";

export async function executeSharedForgotPassword(
  payload: ForgotPasswordPayload,
  siteUrl: string, // <-- baru: diinject dari caller, bukan baca env var sendiri
): Promise<ForgotPasswordResponse> {
  const supabase = await createSupabaseServer();

  const validation = forgotPasswordSchema.safeParse(payload);
  if (!validation.success) {
    return {
      success: false,
      message: "Format email tidak valid.",
      data: {
        email: payload.email
      },
      error: {
        code:"INTERNAL_SERVER_ERROR",
      },
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    validation.data.email,
    {
      redirectTo: `${siteUrl}`,
    },
  );
  console.log('DEBUG redirectTo:', `${siteUrl}/auth/callback?next=/reset-password`);

  if (error) {
    console.error("Shared Forgot Password Error:", error.message);
  }

  return {
    success: true,
    message: GENERIC_FORGOT_PASSWORD_MESSAGE,
  };
}

export async function executeSharedResetPassword(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> {
  const supabase = await createSupabaseServer();

  const validation = resetPasswordSchema.safeParse(payload);
  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak memenuhi syarat keamanan.",
      error: {
        code:"ERROR_VALIDATION"
      },
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message:
        "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda.",
      error: {
        code:"INTERNAL_SERVER_ERROR"
      },
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: validation.data.newPassword,
  });

  if (error) {
    console.error("Shared Update Password Error:", error.message);
    return {
      success: false,
      message: "Gagal memperbarui password. Silakan coba lagi.",
      error: {
        code:"INTERNAL_SERVER_ERROR"
      },
    };
  }

  // Invalidate sesi ini setelah berhasil -- cegah sesi lama dipakai
  // ganti password lagi tanpa link baru.
  await supabase.auth.signOut();

  return {
    success: true,
    message: "Password Anda berhasil diperbarui. Silakan login dengan password baru.",
  };
}