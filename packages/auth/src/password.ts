// packages/auth/src/services.ts
import { createSupabaseServer } from "@bn/supabase";
import { forgotPasswordSchema, resetPasswordSchema } from "@bn/validators"; 
import { 
  ForgotPasswordPayload, ForgotPasswordResponse, 
  ResetPasswordPayload, ResetPasswordResponse 
} from "@bn/types";
import { handleAuthError } from "./errors";

export async function executeSharedForgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
  const supabase = await createSupabaseServer();

  // Validasi Zod terpusat
  const validation = forgotPasswordSchema.safeParse(payload);
  if (!validation.success) {
    return { 
      success: false, 
      message: "Format email tidak valid.",
      data: { email: payload.email } // Selamatkan input form
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

  const { error } = await supabase.auth.resetPasswordForEmail(validation.data.email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    console.error("Shared Forgot Password Error:", error.message);
    // 💡 Skenario Keamanan (User Enumeration Protection):
    // Jika email tidak terdaftar, Supabase tetap melempar sukses/error tertentu tergantung setting.
    // Demi UX & Keamanan, kita bisa lempar ke handleAuthError ATAU manipulasi agar tetap terlihat sukses.
    // Mari kita gunakan handleAuthError yang aman, jika mau disembunyikan tinggal return sukses di bawah.
    return handleAuthError(error, { email: validation.data.email });
  }

  return {
    success: true,
    message: "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.",
  };
}

export async function executeSharedResetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
  const supabase = await createSupabaseServer();

  // Validasi Zod terpusat
  const validation = resetPasswordSchema.safeParse(payload);
  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak memenuhi syarat keamanan.",
      data: { email: payload.email } // Selamatkan email, buang password barunya demi keamanan
    };
  }

  // Cek apakah user memiliki sesi aktif dari link email (AccessToken di cookie)
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { 
      success: false, 
      message: "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda.",
      data: { email: validation.data.email }
    };
  }

  // Eksekusi update password baru
  const { error } = await supabase.auth.updateUser({ 
    password: validation.data.new_password 
  });

  if (error) {
    console.error("Shared Update Password Error:", error.message);
    return handleAuthError(error, { email: validation.data.email });
  }

  return { 
    success: true, 
    message: "Password Anda berhasil diperbarui." 
  };
}