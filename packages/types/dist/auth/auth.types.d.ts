import type { Tables } from '../base.types';
import type { Session, User } from '@bn/supabase';
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
export type AuthUser = User & {
    profile: Profile | null;
    accesses: UserAccess[];
};
export type AuthSession = Omit<Session, 'user'> & {
    user: AuthUser;
};
export type AuthClaims = {
    sub: string;
    email?: string;
    app_metadata: {
        provider?: string;
        providers?: string[];
        role_codes: string[];
        domain_codes: string[];
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
export type RegisterResponse = BaseResponse<{
    user?: AuthUser;
}>;
export type LoginResponse = BaseResponse<{
    session?: AuthSession;
}>;
export type LogoutResponse = BaseResponse;
export type ResetPasswordResponse = BaseResponse;
export type GetUserResponse = {
    user: AuthUser | null;
};
export type GetSessionResponse = {
    session: AuthSession | null;
};
export type GetClaimsResponse = {
    claims: AuthClaims | null;
};
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
//# sourceMappingURL=auth.types.d.ts.map