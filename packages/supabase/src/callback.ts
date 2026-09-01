// packages/supabase/src/callback.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@bn/types";

export async function createSupabaseCallback() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables (callback)");
  }

  return createServerClient<Database>(url, key, {
    auth: {
      flowType: "pkce",
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Dipanggil dari Server Component / Route Handler
        }
      },
    },
  });
}