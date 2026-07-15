// packages/auth/src/services/reset-password.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getCurrentUser() {
  const supabase = await createSupabaseServer();
  return supabase.auth.getUser();
}

export async function updateUserPassword(newPassword: string) {
  const supabase = await createSupabaseServer();
  return supabase.auth.updateUser({ password: newPassword });
}

export async function signOutCurrentSession() {
  const supabase = await createSupabaseServer();
  return supabase.auth.signOut();
}