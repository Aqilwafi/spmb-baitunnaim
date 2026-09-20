// packages/auth/src/services/login.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { RegisterPayload, BaseAuthResponse } from "@bn/types";

export async function signUpWithPassword({email, password, username = null}: RegisterPayload): Promise<BaseAuthResponse> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    return {
      success: false,
      code: error.code
    }
  };

  if(data.user) {
    return {
      success: true,
      message: 'Registrasi Akun Berhasil',
      id: data.user.id,
      credential: data.user.email
    }
  };

  return {
    success: true,
    message: 'Diperlukan Verifikasi Email',
    credential: email
  };
}