// packages/auth/src/core-user.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getSession() {

  const supabase = await createSupabaseServer();
  return await supabase.auth.getSession();
}

export async function getUser() {

  const supabase = await createSupabaseServer();
  return await supabase.auth.getUser();
}

export async function getClaims() {

  const supabase = await createSupabaseServer();
  return await supabase.auth.getClaims(); 
}