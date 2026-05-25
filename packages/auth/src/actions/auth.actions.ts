"use server";

import { createSupabaseServer } from "@bn/supabase";
import { RegisterResponse, LoginResponse, LogoutResponse, BaseResponse, AuthUser } from "@bn/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerAction(prevState: any, formData: FormData): Promise<RegisterResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const username = formData.get("username") as string; // Ambil username jika ada di form register

  // 1. Validasi Password (Server Side)
  if (password !== confirmPassword) {
    return { success: false, message: "Password dan Konfirmasi Password tidak cocok." };
  }

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Menyimpan data tambahan ke user_metadata Supabase
      data: { username } 
    }
  });

  if (error) {
    return { 
      success: false, 
      message: error.message === "User already registered" 
        ? "Email sudah terdaftar." 
        : error.message 
    };
  }

  // Jika Anda mengembalikan user, lakukan casting ke AuthUser (atau sesuaikan kebutuhan)
  return { 
    success: true, 
    message: "Registrasi berhasil. Silakan cek email Anda untuk konfirmasi.",
    user: data.user ? (data.user as unknown as AuthUser) : undefined
  };
}

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponse | void> {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: identifier,
    password: password,
  });

  if (error) {
    const errorMessages: Record<string, string> = {
      "Invalid login credentials": "Email atau password salah.",
      "Email not confirmed": "Email belum dikonfirmasi.",
      "Too many requests": "Terlalu banyak percobaan. Coba lagi nanti.",
    };
    return { 
      success: false, 
      message: errorMessages[error.message] || "Terjadi kesalahan saat login." 
    };
  }

  // REFRESH & REDIRECT (Wajib dipanggil di luar blok penanganan error)
  revalidatePath("/", "layout"); 
  redirect("/dashboard");
}

export async function logoutAction(): Promise<LogoutResponse | void> {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServer();
  
  // 1. Ambil user object dasar dari Supabase Auth
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  // 2. Ambil data profil & relasi tabel internal (Profiles, UserRoles, dst)
  // Sesuaikan nama query ini dengan nama tabel database Anda
  const { data: profileData } = await supabase
    .from("profiles")
    .select(`
      *,
      user_roles (
        assigned_at,
        assigned_by,
        suspended_at,
        suspended_by,
        master_roles (*),
        master_domains (*)
      )
    `)
    .eq("id", user.id)
    .single();

  // Mapping ke dalam struktur AuthUser kustom Anda
  const accesses = profileData?.user_roles?.map((ur: any) => ({
    role: ur.master_roles,
    domain: ur.master_domains,
    assigned_at: ur.assigned_at,
    assigned_by: ur.assigned_by,
    suspended_at: ur.suspended_at,
    suspended_by: ur.suspended_by,
  })) || [];

  return {
    ...user, // Menyertakan field bawaan Supabase User (id, email, app_metadata, dll)
    profile: profileData ? { id: profileData.id, updated_at: profileData.updated_at, username: profileData.username, avatar_url: profileData.avatar_url } : null,
    accesses,
  } as AuthUser;
}

export async function forgotPasswordAction(email: string): Promise<BaseResponse> {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    console.error("Reset Password Error:", error.message);
    // Tetap kembalikan pesan sukses terselubung demi keamanan agar penyerang tidak bisa mendeteksi email terdaftar
  }

  return {
    success: true,
    message: "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.",
  };
}

export async function updatePasswordAction(password: string): Promise<BaseResponse> {
  if (!password || password.length < 6) {
    return { success: false, message: "Password minimal harus 6 karakter." };
  }

  const supabase = await createSupabaseServer();

  // Validasi token langsung ke server Supabase
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, message: "Sesi tidak ditemukan atau kedaluwarsa. Silakan klik ulang link dari email Anda." };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update Password Error:", error.message);
    return { success: false, message: "Gagal memperbarui password. Silakan coba lagi." };
  }

  return { success: true, message: "Password Anda berhasil diperbarui." };
}