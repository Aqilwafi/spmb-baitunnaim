// packages/auth/src/services/login.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { Credentials, BaseAuthResponse} from "@bn/types";

export async function signInWithPassword({email, password}: Credentials): Promise<BaseAuthResponse> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      success: false,
      code: error.code
    }
  }
  return {
    success: true,
    message: "Login Berhasil",
    id: data.user.id,
    credential: data.user.email
  }
}