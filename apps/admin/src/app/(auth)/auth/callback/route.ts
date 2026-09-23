// apps/admin/src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@bn/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const error = requestUrl.searchParams.get('error');
  const errorCode = requestUrl.searchParams.get('error_code');
  
  // Default redirect ke set-password untuk flow invite/forgot password, atau ambil dari parameter 'next'
  const next = requestUrl.searchParams.get('next') ?? '/set-password';

  // Jika ada error dari Supabase, lempar kembali ke halaman login/error
  if (error) {
    const loginUrl = new URL('/', requestUrl.origin);
    loginUrl.searchParams.set('error', errorCode ?? error);
    return NextResponse.redirect(loginUrl);
  }

  // Jika menggunakan token_hash dan type (standar email link Supabase SSR)
  if (token_hash && type) {
    const supabase = await createSupabaseServer();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (verifyError) {
      console.error('Verify OTP error:', verifyError.name, verifyError.message);
      const loginUrl = new URL('/', requestUrl.origin);
      loginUrl.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(loginUrl);
    }

    // Jika sukses verifikasi, arahkan ke halaman tujuan (misal: /auth/set-password)
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // Fallback jika parameter tidak lengkap
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}