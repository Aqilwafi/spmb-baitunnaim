// packages/auth/src/core-user.ts

import { createSupabaseServer } from "@bn/supabase";
import { GetUserResponse, GetClaimsResponse, GetSessionResponse } from "@bn/types";

export async function getCurrentSession(): Promise<GetSessionResponse | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error ||!data.session) {
    return null;
  }

  return data.session as unknown as GetSessionResponse;
}

export async function getCurrentUser(): Promise<GetUserResponse | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error ||!data.user) {
    return null;
  }

  return data.user as unknown as GetUserResponse;
}

export async function getCurrentClaims(): Promise<GetClaimsResponse | null> {
  const supabase = await createSupabaseServer();
  
  const { data, error } = await supabase.auth.getClaims(); 
  //console.log("log", error);

  if (error || !data?.claims) {
    return null;
  }

  return data.claims as unknown as GetClaimsResponse;
}