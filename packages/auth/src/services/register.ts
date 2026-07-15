// packages/auth/src/services/login.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function signUpWithPassword(email: string, password: string) {
  const supabase = await createSupabaseServer();
  return supabase.auth.signUp({ email, password });
}