// packages/auth/src/services/forgot-password.ts

import "server-only";
import { createSupabaseStatic } from "@bn/supabase";

export async function resetPasswordForEmail(email: string, redirectUrl: string) {
  const supabase = await createSupabaseStatic();
  return supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
}