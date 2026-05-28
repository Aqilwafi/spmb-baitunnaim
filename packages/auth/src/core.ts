import { createSupabaseServer } from "@bn/supabase";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, LogoutResponse, BaseResponse } from "@bn/types";
import { handleAuthError } from "./errors";

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    return handleAuthError(error) as LoginResponse;
  }
  if (!data.user || !data.session) {
    return { success: false, message: "Data sesi pengguna tidak ditemukan." } as LoginResponse;
  }

  // 💡 JANGAN LUPA TAMBAHKAN INI DI AKHIR FUNCTION SHARED
  return {
    success: true,
    message: "Login berhasil.",
    user: data.user,      
    session: data.session 
  };
}

export async function executeSharedRegister(payload: RegisterPayload): Promise<RegisterResponse> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: { 
        username: payload?.username 
      } 
    }
  })

    if (error) {
      return handleAuthError(error) as RegisterResponse;
    }

  return {
    success: true,
    message: "Jika email anda valid, kami akan memberikan link verifikasi ke email tersebut."
  };
};

export async function executeSharedLogout(): Promise<LogoutResponse | void> {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signOut();

  if (error) {
      return handleAuthError(error) as LogoutResponse;
    }
    
  return {
    success: true,
    message: "Logout Berhasil."
  }
}

export async function executeSharedForgotPassword(email: string): Promise<BaseResponse> {
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

export async function executeSharedUpdatePassword(password: string): Promise<BaseResponse> {
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