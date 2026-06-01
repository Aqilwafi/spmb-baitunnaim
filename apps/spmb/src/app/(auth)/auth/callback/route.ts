// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@bn/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createSupabaseServer();
    
    // Gunakan try-catch agar tidak crash jika token tidak valid
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      // Jika tukar token gagal, lempar ke halaman error atau login
      return NextResponse.redirect(new URL('/login?error=invalid_token', requestUrl.origin));
    }
  }

  // Redirect sukses
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
