// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@bn/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  console.log('Supabase callback request URL:', requestUrl);
  console.log('Supabase callback request:', requestUrl.href);
  console.log('Supabase callback code:', code);
  const error = requestUrl.searchParams.get('error');
  const errorCode = requestUrl.searchParams.get('error_code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  // Case 1: Supabase sendiri sudah menolak (link expired/invalid)
  // sebelum sempat kirim 'code'
  if (error) {
    const loginUrl = new URL('/login', requestUrl.origin);
    loginUrl.searchParams.set('error', errorCode ?? error);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: ada code, coba exchange
  if (code) {
    const supabase = await createSupabaseServer();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const loginUrl = new URL('/login', requestUrl.origin);
      loginUrl.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // Case 3: gak ada code maupun error -- request aneh, aman diarahkan ke login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}