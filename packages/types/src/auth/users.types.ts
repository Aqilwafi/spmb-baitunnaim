import { User } from '@supabase/supabase-js';
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

export type Profiles = Tables<'profiles'>;
export type ProfilesInsert = TablesInsert<'profiles'>;
export type ProfilesUpdate = TablesUpdate<'profiles'>;

export type UserRoles = Tables<'user_roles'>;
export type UserRolesInsert = TablesInsert<'profiles'>;
export type UserRolesUpdate = TablesUpdate<'profiles'>;

export type UsersData = Profiles & {
  user_roles: {
    role_id: number;
  };
};