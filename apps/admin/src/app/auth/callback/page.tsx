"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@bn/supabase";
import { createSupabaseClient } from "@bn/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabaseBrowser = createSupabaseBrowser(); // supabase-js, untuk parse hash
    const supabaseSSR = createSupabaseClient();      // @supabase/ssr, untuk set cookie

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
      console.log("auth event:", event, !!session);
      if (session) {
        subscription.unsubscribe();
        // Set session ke SSR client supaya cookie tersimpan
        await supabaseSSR.auth.setSession({
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