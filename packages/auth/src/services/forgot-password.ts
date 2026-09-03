// packages/auth/src/services/forgot-password.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase"; // bukan createSupabaseStatic

export async function resetPasswordForEmail(email: string, redirectUrl: string) {
  const supabase = await createSupabaseServer();
  
  return supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
}