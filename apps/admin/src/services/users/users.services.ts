// @/services/users/users.services.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import type { UsersData } from "@/types/user.types";
import { listAuthUsers } from "./users.admin.services";

export async function getUsers(supabase: AppSupabaseClient): Promise<UsersData[]> {
  const [
    authUsers,
    { data: profiles, error: profileError },
    { data: userRoles, error: roleError },
  ] = await Promise.all([
    listAuthUsers(),
    supabase.from('profiles').select('id, username, phone'),
    supabase.from('user_roles').select('user_id, role_id, is_active'),
  ]);

  if (profileError) {
    throw new Error(`Gagal mengambil data profiles: ${profileError.message}`);
  }
  if (roleError) {
    throw new Error(`Gagal mengambil data user roles: ${roleError.message}`);
  }

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) ?? []);
  const roleMap = new Map<string, typeof userRoles>();
  for (const ur of userRoles ?? []) {
    const existing = roleMap.get(ur.user_id) ?? [];
    roleMap.set(ur.user_id, [...existing, ur]);
  }

  const merged: UsersData[] = authUsers.map((authUser) => {
    const profile = profileMap.get(authUser.id);
    const roles = roleMap.get(authUser.id) ?? [];

    return {
      id: authUser.id,
      email: authUser.email ?? "",
      username: profile?.username ?? "",
      phone: profile?.phone ?? "",
      roles: roles.map((r) => ({ role_id: r.role_id, is_active: r.is_active })),
      last_login: authUser.last_sign_in_at
        ? new Date(authUser.last_sign_in_at)
        : null,
    };
  });

  return merged;
}