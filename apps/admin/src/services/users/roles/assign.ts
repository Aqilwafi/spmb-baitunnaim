// admin @/services/users/roles/assign.ts

import 'server-only';
import { createSupabaseServer } from '@bn/supabase/server';
import type { BaseAuthResponse } from '@bn/types';

export async function assignRole(userId: string, roleId: number): Promise<BaseAuthResponse> {
    const supabase = await createSupabaseServer();

    // 1. Masukkan data ke tabel user_roles
    const { data, error } = await supabase
        .from('user_roles')
        .insert({
            user_id: userId,
            role_id: roleId,
        })
        .select() 
        .single();

    if (error) {
        return{
            success: false,
            code: error.code
        };
    }

    return {
        success: true,
        id: data.user_id       
    };
}