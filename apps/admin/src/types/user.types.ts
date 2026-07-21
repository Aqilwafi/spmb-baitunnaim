import type { ProfileItem, UserRoleItem } from "@bn/types";

export type UsersData = Pick<ProfileItem, 'id' | 'username' | 'phone'> & {
    email: string;
    roles: Pick<UserRoleItem, 'role_id' | 'is_active'>[];
    role_names?: string[]; 
    last_login: Date | null; 
};