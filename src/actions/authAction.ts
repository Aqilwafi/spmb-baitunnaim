// actions/authAction.ts
"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { AuthUser } from "@/types/typeAuth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // 1. Validasi Password (Server Side)
  if (password !== confirmPassword) {
    return { error: "Password dan Konfirmasi Password tidak cocok." };
  }

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message === "User already registered" 
      ? "Email sudah terdaftar." 
      : error.message 
    };
  }

  return { success: true, email };
}

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: identifier,
    password: password,
  });

  if (error) {
    // Mapping error seperti yang sudah kamu buat sebelumnya
    const errorMessages: Record<string, string> = {
      "Invalid login credentials": "Email atau password salah.",
      "Email not confirmed": "Email belum dikonfirmasi.",
      "Too many requests": "Terlalu banyak percobaan. Coba lagi nanti.",
    };
    return { error: errorMessages[error.message] || "Terjadi kesalahan." };
  }

  // REFRESH & REDIRECT (Gantikan fungsi router.push di client)
  revalidatePath("/", "layout"); 
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    role: user.app_metadata.role,
  };
}

export async function forgotPasswordAction(email: string) {
  const supabase = await createSupabaseServer();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    // Audit Log (Staging/Production)
    // Di sini kamu panggil fungsi logger kamu
    // logAudit({ action: 'FORGOT_PASSWORD', status: 'FAILURE', detail: error.message, identifier: email });
    
    // Kita tidak mengembalikan error.message ke user untuk security
    console.error("Reset Password Error:", error.message);
  }

  // Selalu kembalikan success: true dan pesan generik
  return { 
    success: true, 
    message: "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar." 
  };
}

export async function updatePasswordAction(password: string) {
  // 1. Validasi Kekuatan Password (Penting untuk Security!)
  if (!password || password.length < 6) {
    return { error: "Password minimal harus 6 karakter." };
  }

  const supabase = await createSupabaseServer();
  
  // 2. Cek apakah ada session user yang aktif
  // getUser() lebih aman daripada getSession() karena memvalidasi token ke server Supabase
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "Sesi tidak ditemukan. Silakan klik ulang link dari email Anda." };
  }

  // 3. Eksekusi update
  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    // Log error asli untuk internal
    console.error("Update Password Error:", error.message);
    return { error: "Gagal memperbarui password. Silakan coba lagi." };
  }

  return { success: true };
}