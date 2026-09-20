// packages/types/src/auth/auth.types.ts

import type { Tables } from '../shared/supabase';
import type { Session, User, JwtPayload } from '../shared/core.types';

export interface AuthActivityLogs {
  ip?: string | null;         
  userAgent?: string | null; 
  forwardedFor?: string | null;
  realIp?: string | null;
  credential?: string;
  id?: string;
  code?: string;
  message?: string;
  [key: string]: any;
}

export interface Credentials {
  email: string;
  password: string;
};  

export interface RegisterPayload extends Credentials {
  username?: string | null;
};

export interface ResetPasswordPayload {
  newPassword: Credentials['password'];
  username?: string | null;
};

// belum pernah dipakai

export type Profile = Tables<'profiles'>;
export type MasterRole = Tables<'master_roles'>;
export type UserRole = Tables<'user_roles'>;

export type AuthClaims = Omit<JwtPayload, "app_metadata" | "user_metadata"> & {
  app_metadata: {
    access_rights: string[];
    provider?: string;
    providers?: string[];
  };

  user_metadata?: {
    username?: string;
  };
};

export type GetUserResponse = User;
export type GetSessionResponse = Session;
export type GetClaimsResponse = JwtPayload & {
  app_metadata: {
    access_rights: string[];
    provider?: string;
    providers?: string[];
  };
  user_metadata?: {
    email_verified?: boolean;
    username?: string;
  };
};

export type RequireAuthOptions = {
  redirect_to?: string;
};

export type RequireAccessOptions = {
  role_codes?: string[];
  domain_codes?: string[]; 
  redirect_to?: string;
};