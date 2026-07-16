// packages/types/src/auth/auth.types.ts

import type { Tables } from '../shared/supabase';
import type { Session, User, JwtPayload } from '../shared/core.types'; // Pastikan package ini mengekspor tipe asli Supabase

export type Credetials = {
  email: string;
  password: string;
};  

export type RegisterPayload = Credetials & {
  username: string;
  confirm_password: string;
};

export type LoginPayload = Credetials;

export type ForgotPasswordPayload = Pick<Credetials, 'email'>;

export type ResetPasswordPayload = {
  newPassword: string;
  confirmNewPassword: string;
};




// belum pernah dipakai

export type Profile = Tables<'profiles'>;
export type MasterRole = Tables<'master_roles'>;
export type UserRole = Tables<'user_roles'>;
type RoleCode = MasterRole['code'];

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
export type GetClaimsResponse = Omit<JwtPayload, "app_metadata" | "user_metadata"> & {
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