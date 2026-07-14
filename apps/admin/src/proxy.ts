// apps/admin/src/middleware.ts
import { updateSession } from "@bn/supabase";
import { type NextRequest, type NextResponse } from "next/server";
import { ROUTES } from "@bn/constants";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // Tentukan aturan proteksi khusus SPMB
  const shouldProtectSPMB = (pathname: string): boolean => {
    // Lindungi dashboard user
    if (pathname.startsWith(ROUTES.ADMIN.DASHBOARD)) return true;
    // Lindungi halaman pendaftaran berbayar
    
    return false; // Halaman lain publik (misal: home page SPMB)
  };

  // Panggil shared updateSession dengan aturan SPMB
  return await updateSession(request, {
    shouldProtect: shouldProtectSPMB,
    loginUrl: ROUTES.ADMIN.HOME, // Misal: /login (beda dengan admin path?)
  });
}

export const config = {
  // Konfigurasi matcher SPMB
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/dashboard/:path*",
  ],
};