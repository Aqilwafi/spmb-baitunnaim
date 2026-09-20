// packages/auth/src/services/forgot-password.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BaseAuthResponse } from "@bn/types";

export async function resetPasswordForEmail(email: string, redirectUrl: string): Promise<BaseAuthResponse> {
  const supabase = await createSupabaseServer();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });

  if (error) {
    return {
      success: false,
      code: error.code,
      credential: email
    }
  }
  return {
    success: true,
    message: 'Request Reset Password Berhasil',
    credential: email
  }
}