// admin/src/app/auth/callback/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseCallback } from "@bn/supabase";
import { createSupabaseBrowser } from "@bn/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabaseCallback  = createSupabaseCallback(); // supabase-js, untuk parse hash
    const supabaseBrowser = createSupabaseBrowser();      // @supabase/ssr, untuk set cookie

    const { data: { subscription } } = supabaseCallback.auth.onAuthStateChange(async (event, session) => {
     
      if (session) {
        subscription.unsubscribe();
        // Set session ke SSR client supaya cookie tersimpan
        await supabaseBrowser.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
        router.replace("/auth/set-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return <p>Memproses autentikasi...</p>;
}