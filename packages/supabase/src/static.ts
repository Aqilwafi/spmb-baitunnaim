// packages/supabase/src/server-static.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@bn/types";

export function createSupabaseStatic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables (static)");
  }

  return createClient<Database>(url, key);
}