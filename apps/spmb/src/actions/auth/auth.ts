"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { 
  RegisterResponse, 
  LoginResponse, 
  LogoutResponse,  
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RegisterPayload,
  LoginPayload 
} from "@bn/types";
import { 
  executeSharedLogin, 
  executeSharedRegister, 
  executeSharedLogout, 
  executeSharedForgotPassword, 
  executeSharedResetPassword 
} from "@bn/auth";

// 1. REGISTER ACTION
export async function registerAction(_prevState: any, formData: FormData): Promise<RegisterResponse> {
  const payload = Object.fromEntries(formData) as RegisterPayload;
  const email = (payload.email as string) || "";

  const result = await executeSharedRegister(payload);

  if (!result.success) {
    return {
      ...result,
      data: { email }, // Mempertahankan input email jika validasi/register gagal
    };
  }

  return {
    success: true,
    message: "Registrasi berhasil. Silakan cek email Anda untuk verifikasi.",
    data: { email },
  };
}

// 2. LOGIN ACTION
export async function loginAction(_prevState: any, formData: FormData): Promise<LoginResponse> {
  const payload = Object.fromEntries(formData) as LoginPayload;
  const email = (payload.email as string) || "";

  const result = await executeSharedLogin(payload);
  
  if (!result.success) {
    return {
      ...result,
      data: { email }, // Mempertahankan input email agar tidak terhapus saat login gagal
    };
  } 

  // Audit Logging
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    null;

  const userAgent = headersList.get("user-agent");

  console.log("LOGIN AUDIT", {
    ip,
    userAgent,
    forwardedFor: headersList.get("x-forwarded-for"),
    realIp: headersList.get("x-real-ip"),
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// 3. LOGOUT ACTION
export async function logoutAction(): Promise<LogoutResponse> {
  const result = await executeSharedLogout();
  
  if (!result) {
    return result; // Mengembalikan error jika gagal logout
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

// 4. FORGOT PASSWORD ACTION
export async function forgotPasswordAction(_prevState: any, formData: FormData): Promise<ForgotPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);
  const email = (rawPayload.email as string) || "";
  const siteUrl = `${process.env.NEXT_PUBLIC_SPMB_URL!}/auth/callback?next=/reset-password`;
  
  const result = await executeSharedForgotPassword(rawPayload as ForgotPasswordPayload, siteUrl);

  return {
    ...result,
    data: { email }, // Selalu pertahankan input email untuk feedback UI
  };
}

// 5. RESET PASSWORD ACTION
export async function resetPasswordAction(_prevState: any, formData: FormData): Promise<ResetPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);

  const result = await executeSharedResetPassword(rawPayload as ResetPasswordPayload);

  if (!result.success) {
    return result; // Tampilkan error di form (misal: password tidak cocok), jangan redirect
  }

  redirect("/login?reset=success");
}