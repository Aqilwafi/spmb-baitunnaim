// packages/auth/src/services/users/list.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { Profile, UserRoles } from "@bn/types";

export interface UserData {
    userRoleId: UserRoles['id'];
    id: Profile['id'];
    email: Profile['email'];
    username: Profile['username'];
    phone: Profile['phone'];
    roleId: UserRoles['role_id'];
    accountCreatedAt: Profile['created_at'];
    roleAssignedAt: UserRoles['created_at'];
}

export async function getUsersByRoleIds(roleIds: number[]): Promise<UserData[]> {
    const supabase = await createSupabaseServer();
 
    // Mulai query dari user_roles sebagai tabel utama
    const { data, error } = await supabase
        .from('user_roles')
        .select(`
            id,
            role_id,
            created_at,
            profiles!inner (
                id,
                username,
                email,
                phone,
                created_at
            )
        `)
        .in('role_id', roleIds);

    if (error) {
        throw error;
    }

    if (!data) {
        return [];
    }

    // Mapping data mentah dari Supabase ke interface UserData
    return data.map((item) => {
        // Karena profiles adalah relasi tunggal (belongs-to dari sudut pandang user_roles)
        const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;

        return {
            userRoleId: item.id,
            id: profile?.id,
            email: profile?.email,
            username: profile?.username,
            phone: profile?.phone,
            roleId: item.role_id,
            accountCreatedAt: profile?.created_at,
            roleAssignedAt: item.created_at,
        };
    });
}