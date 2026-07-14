import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

export type ProfileRaw = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;
export type ProfileListItem = Pick<ProfileRaw, 'id'| 'username' | 'updated_at' | 'avatar_url' | 'phone'>;

export type UserRoleRaw = Tables<'user_roles'>;
export type UserRoleInsert = TablesInsert<'profiles'>;
export type UserRolUpdate = TablesUpdate<'profiles'>;
export type UserRolListItem = Pick<UserRoleRaw, 'id'|'user_id' | 'role_id' | 'is_active' >;