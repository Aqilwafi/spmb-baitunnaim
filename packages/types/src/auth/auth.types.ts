// packages/types/src/auth/auth.types.ts

import type { Tables } from '../base.types';
import type { Session, User } from '@bn/supabase'; // Pastikan package ini mengekspor tipe asli Supabase

export type Profile = Tables<'profiles'>;
export type MasterRole = Tables<'master_roles'>;
export type MasterDomain = Tables<'master_domains'>;
export type UserRole = Tables<'user_roles'>;

export type UserAccess = {
  role: MasterRole;
  domain: MasterDomain;
  assigned_at: string | null;
  assigned_by: string | null;
  suspended_at: string | null;
  suspended_by: string | null;
};

// Meng-extend User asli Supabase dengan data relasional internal kita
export type AuthUser = User & {
  profile: Profile | null;
  accesses: UserAccess[];
};

// Meng-extend Session asli Supabase dengan AuthUser kustom kita
export type AuthSession = Omit<Session, 'user'> & {
  user: AuthUser;
};

// Struktur JWT Custom Claims yang aman dan sesuai dengan app_metadata Supabase
export type AuthClaims = {
  sub: string;
  email?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
    roles: string[];
    domains: string[];
  };
  user_metadata: {
    username?: string;
  };
  exp?: number;
  iat?: number;
};

/**
 * Payload & Actions Types
 */
export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export type LoginPayload = Pick<RegisterPayload, 'email' | 'password'>;

export type ResetPasswordPayload = {
  email: string;
  new_password: string;
  confirm_new_password: string;
};

/**
 * API / Server Actions Responses (Menggunakan Generic Pattern)
 */
export type BaseResponse<T = undefined> = {
  success: boolean;
  message: string;
} & (T extends undefined ? {} : T);

export type RegisterResponse = BaseResponse;
export type LoginResponse = BaseResponse<{ user: User, session: Session }>;
export type LogoutResponse = BaseResponse;
export type ResetPasswordResponse = BaseResponse;

export type GetUserResponse = { user: AuthUser | null };
export type GetSessionResponse = { session: AuthSession | null };
export type GetClaimsResponse = { claims: AuthClaims | null };

/**
 * Middleware / Guard Options
 */
export type RequireAuthOptions = {
  redirect_to?: string;
};

export type RequireAccessOptions = {
  role_codes?: string[];
  domain_codes?: string[]; 
  redirect_to?: string;
};