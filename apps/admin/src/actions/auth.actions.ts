// apps/admin/srcp/actions/auth.actions.ts

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { 
  LoginResponse, 
  LogoutResponse,  
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginPayload
} from "@bn/types";import { 
  executeSharedLogin, 
  executeSharedLogout, 
  executeSharedForgotPassword, 
  executeSharedResetPassword } from "@bn/auth";

export async function loginAction(_prevState: any, formData: FormData): Promise<LoginResponse> {

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
  redirect("/");
}

export async function forgotPasswordAction(_prevState: any, formData: FormData): Promise<ForgotPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);
  const siteUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL!}/auth/callback?next=/reset-password`;
  
  // Langsung oper ke Shared Service
  return await executeSharedForgotPassword(rawPayload as ForgotPasswordPayload, siteUrl);
}

export async function resetPasswordAction(_prevState: any, formData: FormData): Promise<ResetPasswordResponse> {
  const rawPayload = Object.fromEntries(formData);

  const result = await executeSharedResetPassword(rawPayload as ResetPasswordPayload);

  if (!result.success) {
    return result; // tampilkan error di form, jangan redirect
  }

  redirect("/login?reset=success");
}