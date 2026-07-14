"use server";

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
  LoginPayload } from "@bn/types";
import { 
  executeSharedLogin, 
  executeSharedRegister, 
  executeSharedLogout, 
  executeSharedForgotPassword, 
  executeSharedResetPassword } from "@bn/auth";

export async function registerAction(prevState: any, formData: FormData): Promise<RegisterResponse> {
  const payload = Object.fromEntries(formData) as RegisterPayload;
  const { password, confirmPassword, ...safePayload } = payload as any;

  const result = await executeSharedRegister(payload);

  if (!result.success) {
    return {
      ...result,
      data: { email: safePayload.email },
    };
  }

  return {
    success: true,
    message: "Registrasi berhasil. Silakan cek email Anda untuk verifikasi.",
    data: { email: safePayload.email },
  };
}

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponse> {

  const payload = Object.fromEntries(formData) as LoginPayload;

  const result = await executeSharedLogin(payload);

  if (!result.success) {
    return result;
  } 

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

export async function forgotPasswordAction(prevState: any, formData: FormData): Promise<ForgotPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);
  const siteUrl = `${process.env.NEXT_PUBLIC_SPMB_URL!}/auth/callback?next=/reset-password`;
  console.log('DEBUG siteUrl:', siteUrl);
  // Langsung oper ke Shared Service
  return await executeSharedForgotPassword(rawPayload as ForgotPasswordPayload, siteUrl);
}

export async function resetPasswordAction(prevState: any, formData: FormData): Promise<ResetPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);

  const result = await executeSharedResetPassword(rawPayload as ResetPasswordPayload);

  if (!result.success) {
    return result; // tampilkan error di form, jangan redirect
  }

  redirect("/login?reset=success");
}
