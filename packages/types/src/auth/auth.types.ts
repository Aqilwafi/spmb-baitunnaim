// packages/types/src/auth/auth.types.ts

import type { Tables } from '../base.types';
import type { Session, User } from '@bn/supabase';

export type Profile =
  Tables<'profiles'>

export type MasterRole =
  Tables<'master_roles'>

export type MasterDomain =
  Tables<'master_domains'>

export type UserRole =
  Tables<'user_roles'>

export type UserAccess = {
  role: MasterRole
  domain: MasterDomain
  assigned_at: string | null
  assigned_by: string | null
  suspended_at: string | null
  suspended_by: string | null
}

export type AuthUser = {
  id: string
  email: string
  email_verified: boolean
  profile: Profile | null
  accesses: UserAccess[]
}

export type AuthSession = {
  access_token: string
  refresh_token: string
  expires_at: number
  expires_in: number
  token_type: string
  user: AuthUser
}

export type AuthClaims = {
  sub: string
  email: string
  role_codes: string[]
  domain_codes: string[]
  exp?: number
  iat?: number
}

export type RegisterPayload = {
  email: string
  username: string
  password: string
  confirm_password: string
}

export type RegisterResponse = {
  success: boolean
  message: string
  user?: AuthUser
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  message: string
  session?: AuthSession
}

export type LogoutResponse = {
  success: boolean
  message: string
}

export type ResetPasswordPayload = {
  email: string
  new_password: string
  confirm_new_password: string
}

export type ResetPasswordResponse = {
  success: boolean
  message: string
}

export type GetUserResponse = {
  user: AuthUser | null
}

export type GetSessionResponse = {
  session: AuthSession | null
}

export type GetClaimsResponse = {
  claims: AuthClaims | null
}

export type RequireAuthOptions = {
  redirect_to?: string
}

export type RequireAccessOptions = {
  role_codes?: string[]
  domain_codes?: string[] 
  redirect_to?: string
}