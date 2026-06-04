import type { Tables } from '../shared/base.types';
import type { Session, User, JwtPayload } from '../shared/core.types';
import { BaseResponse } from '../shared/core.types';
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
export type ResetPasswordPayload = Pick<Credetials, 'email'> & {
    new_password: string;
    confirm_new_password: string;
};
export type RegisterResponse = BaseResponse<undefined, Pick<RegisterPayload, 'email' | 'username'>>;
export type LoginResponse = BaseResponse<{
    user: User;
    session: Session;
}, Pick<LoginPayload, 'email'>>;
export type LogoutResponse = BaseResponse;
export type ForgotPasswordResponse = BaseResponse<undefined, Pick<ForgotPasswordPayload, 'email'>>;
export type ResetPasswordResponse = BaseResponse<undefined, Pick<ResetPasswordPayload, 'email'>>;
export type Profile = Tables<'profiles'>;
export type MasterRole = Tables<'master_roles'>;
export type MasterDomain = Tables<'master_domains'>;
export type UserRole = Tables<'user_roles'>;
export type UserAccess = {
    AccessRights: AuthClaims['app_metadata']['access_rights'];
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
//# sourceMappingURL=auth.types.d.ts.map