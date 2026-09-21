// packages/auth/src/services/users/list.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { Profile, UserRoles } from "@bn/types";

export interface UserData {
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
 
    const { data, error } = await supabase
        .from('profiles')
        .select(`
            id,
            username,
            email,
            phone,
            created_at,
            user_roles!inner (
                role_id,
                created_at
            )
        `)
        .in('user_roles.role_id', roleIds);

    if (error) {
        throw error;
    }

    if (!data) {
        return [];
    }

    // Mapping data mentah dari Supabase ke interface UserData
    return data.map((item) => {
        // Karena relasi join mengembalikan array, ambil elemen pertama 
        // (atau sesuaikan jika user punya banyak role yang cocok)
        const userRole = Array.isArray(item.user_roles) 
            ? item.user_roles[0] 
            : item.user_roles;

        return {
            id: item.id,
            email: item.email,
            username: item.username,
            phone: item.phone,
            roleId: userRole?.role_id, // Fallback default jika kosong
            accountCreatedAt: item.created_at,
            roleAssignedAt: userRole?.created_at,
        };
    });
}