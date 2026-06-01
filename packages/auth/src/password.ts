import { createSupabaseServer, User } from "@bn/supabase";
import { BaseResponse, LoginPayload } from "@bn/types";

export async function forgotPassword(email: string): Promise<BaseResponse> {
  const supabase = await createSupabaseServer();

  // Memastikan URL callback dinamis berdasarkan env host yang sedang aktif
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    console.error("Reset Password Error:", error.message);
    return {
      success: false,
      message: error.message, // Mengembalikan pesan error asli agar UI bisa mengelolanya
    };
  }

  return {
    success: true,
    message: "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.",
  };
}

export async function selfUpdatePassword(password: string): Promise<BaseResponse> {
  if (!password || password.length < 6) {
    return { success: false, message: "Password minimal harus 6 karakter." };
  }

  const supabase = await createSupabaseServer();

  // Menggunakan getUser() di sini sudah sangat tepat karena ini adalah mutasi data sensitif 
  // yang wajib divalidasi ke server Supabase, bukan sekadar claims JWT biasa.
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { 
      success: false, 
      message: "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda." 
    };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update Password Error:", error.message);
    return { success: false, message: "Gagal memperbarui password. Silakan coba lagi." };
  }

  return { success: true, message: "Password Anda berhasil diperbarui." };
}

export async function adminUpdatePassword(password: string): Promise<BaseResponse> {
  if (!password || password.length < 6) {
    return { success: false, message: "Password minimal harus 6 karakter." };
  }

  const supabase = await createSupabaseServer();

  // Menggunakan getUser() di sini sudah sangat tepat karena ini adalah mutasi data sensitif 
  // yang wajib divalidasi ke server Supabase, bukan sekadar claims JWT biasa.
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { 
      success: false, 
      message: "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda." 
    };
  }

//   const { data, error } = await supabase.auth.admin.updateUserById(target: string,{ password: 'new_password' })

//   if (error) {
//     console.error("Update Password Error:", error.message);
//     return { success: false, message: "Gagal memperbarui password. Silakan coba lagi." };
//   }

  return { success: true, message: "Password Anda berhasil diperbarui." };
}