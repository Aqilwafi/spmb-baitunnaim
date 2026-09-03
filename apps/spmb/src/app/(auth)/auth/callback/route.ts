// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@bn/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorCode = requestUrl.searchParams.get('error_code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  // Tambahan: cek cookie apa aja yang kebawa di request ini
  const cookieHeader = request.headers.get('cookie');
  console.log('Incoming cookies:', cookieHeader);
  console.log('Has code_verifier cookie:', cookieHeader?.includes('code-verifier') ?? false);

  console.log('Supabase callback code:', code);

  if (error) {
    const loginUrl = new URL('/login', requestUrl.origin);
    loginUrl.searchParams.set('error', errorCode ?? error);
    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    const supabase = await createSupabaseServer();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    // Tambahan: log detail error-nya, bukan cuma truthy check
    if (exchangeError) {
      console.error('Exchange error name:', exchangeError.name);
      console.error('Exchange error message:', exchangeError.message);
      console.error('Exchange error status:', exchangeError.status);
      console.error('Exchange error code:', exchangeError.code); // AuthApiError punya ini kadang

      const loginUrl = new URL('/login', requestUrl.origin);
      loginUrl.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}