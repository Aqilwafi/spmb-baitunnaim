// packages/auth/src/features/session.ts

import { getUser, getClaims, getSession } from "../services/session";

import { GetUserResponse, GetClaimsResponse, GetSessionResponse } from "@bn/types";

export async function getCurrentSession(): Promise<GetSessionResponse | null> {

  const { data, error } = await getSession();

  if (error ||!data.session) {
    return null;
  }

  return data.session as unknown as GetSessionResponse;
}

export async function getCurrentUser(): Promise<GetUserResponse | null> {

  const { data, error } = await getUser();

  if (error ||!data.user) {
    return null;
  }

  return data.user as unknown as GetUserResponse;
}

export async function getCurrentClaims(): Promise<GetClaimsResponse | null> {
  
  const { data, error } = await getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims as unknown as GetClaimsResponse;
}