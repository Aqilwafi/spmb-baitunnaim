import type { ProfileListItem, UserRoleListItem } from "@bn/types";

export type UsersData = Pick<ProfileListItem, 'id' | 'username' | 'phone'> & {
    email: string;
    roles: Pick<UserRoleListItem, 'role_id' | 'is_active'>[];
    role_names?: string[]; 
    last_login: Date | null; 
};