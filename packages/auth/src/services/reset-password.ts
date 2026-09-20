// packages/auth/src/services/reset-password.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BaseAuthResponse } from "@bn/types";

export async function updateUserPassword(newPassword: string, username?:string): Promise<BaseAuthResponse> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.updateUser({ 
    password: newPassword, 
    data: {
      username: username
    } 
  });

  if (error) {
    return {
      success: false,
      code: error.code
    };
  }

  return {
    success: true,
    message: 'Reset Password Berhasil',
    id: data.user.id,
    credential: data.user.email
  };
}
