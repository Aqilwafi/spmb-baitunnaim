"use server";

import { createSupabaseServer } from "@bn/supabase";
import { 
  RegisterResponse, 
  LoginResponse, 
  LogoutResponse, 
  AuthUser, 
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload
} from "@bn/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogin, executeSharedRegister, executeSharedLogout, executeSharedForgotPassword, executeSharedResetPassword } from "@bn/auth";

export async function registerAction(prevState: any, formData: FormData): Promise<RegisterResponse> {
  
  const payload = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirmPassword") as string,
  };

  const result = await executeSharedRegister(payload);

  if (!result.success) {
    return result; // Mengembalikan error (success: false)
  }

  return { 
    success: true,
    message: "Registrasi berhasil. Silakan cek email Anda untuk verifikasi."
  };
}

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponse> {
  // 1. Ekstrak data dari FormData
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // 2. Panggil Shared Core
  const result = await executeSharedLogin(payload);

  // 3. Handle hasil
  if (!result.success) {
    return result; // Kembalikan error agar bisa ditangkap oleh useFormState
  }

  // 4. Sukses: Refresh & Redirect
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction(): Promise<LogoutResponse> {

  const result = await executeSharedLogout();
  if (!result) {
    return result; // Mengembalikan error jika gagal logout
  }

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

export async function forgotPasswordAction(prevState: any, formData: FormData): Promise<ForgotPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);
  
  // Langsung oper ke Shared Service
  return await executeSharedForgotPassword(rawPayload as ForgotPasswordPayload);
}

export async function resetPasswordAction(prevState: any, formData: FormData): Promise<ResetPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);

  // Langsung oper ke Shared Service
  return await executeSharedResetPassword(rawPayload as ResetPasswordPayload);
}