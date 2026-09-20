// admin @/services/users/roles/revoke.ts

import 'server-only';
import { createSupabaseServer } from '@bn/supabase/server';
import type { BaseAuthResponse } from '@bn/types';

export async function revokeRole(userId: string, roleId: number): Promise<BaseAuthResponse> {
    const supabase = await createSupabaseServer();

    // Hapus data dari tabel user_roles berdasarkan user_id dan role_id
    const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role_id', roleId);

    if (error) {
        return {
            success: false,
            code: error.code,
            
        };
    }

    return {
        success: true,
        id: userId,
        message: 'Role berhasil dicabut'
    };
}