// packages/supabase/src/proxy.ts

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export type ProtectCheckFn = (pathname: string) => boolean;

export async function updateSession(
  request: NextRequest,
  options: {
    shouldProtect: ProtectCheckFn;
    loginUrl: string;
  }
) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: user } = await supabase.auth.getClaims();
  const currentPath = request.nextUrl.pathname;

  // PERBAIKAN LOOP:
  // Hanya lakukan redirect jika path perlu dilindungi, user tidak ada, 
  // DAN request saat ini BUKAN menuju loginUrl itu sendiri.
  if (
    options.shouldProtect(currentPath) &&
    !user &&
    currentPath !== options.loginUrl
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = options.loginUrl;
    redirectUrl.searchParams.set("next", currentPath);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}