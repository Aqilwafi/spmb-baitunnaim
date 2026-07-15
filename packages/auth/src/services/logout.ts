import { createSupabaseServer } from "@bn/supabase";

export async function signOut() {

  const supabase = await createSupabaseServer();
  return supabase.auth.signOut();
}