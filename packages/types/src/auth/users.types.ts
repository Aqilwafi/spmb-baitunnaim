import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/base.types';

export type ProfileRaw = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;
export type ProfileListItem = Pick<ProfileRaw, 'id'| 'username' | 'updated_at' | 'avatar_url'>;

export type UserRoleRaw = Tables<'profiles'>;
export type UserRoleInsert = TablesInsert<'profiles'>;
export type UserRolUpdate = TablesUpdate<'profiles'>;
export type UserRolListItem = Pick<ProfileRaw, 'id'| 'username' | 'updated_at' | 'avatar_url'>;