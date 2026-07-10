import { createClient } from "@supabase/supabase-js";

// Fungsi khusus untuk testing/CLI yang tidak butuh cookies Next.js
export function createSupabaseTesting() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase Environment Variables!");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}