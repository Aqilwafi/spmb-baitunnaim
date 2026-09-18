import { createSupabaseServer } from "@bn/supabase/server";

export async function signOut() {

  const supabase = await createSupabaseServer();
  return supabase.auth.signOut();
}