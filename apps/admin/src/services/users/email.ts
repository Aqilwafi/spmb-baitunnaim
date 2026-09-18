// admin @/services/users/list-email.ts

import 'server-only';
import { supabaseAdmin } from '@bn/supabase/admin';
import type { BaseUsers } from '@/types/users.types';

export async function getBaseUsers(): Promise<BaseUsers[]> {
    const supabase = supabaseAdmin;

    // Ambil daftar user dari Supabase Auth
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Gagal mengambil daftar user:', error.message);
        throw error;
    }

    // Mapping ke bentuk BaseUsers
    const users: BaseUsers[] = data.users.map((user) => ({
        id: user.id,
        email: user.email ?? '',
        username: user.user_metadata?.username ?? user.user_metadata?.name ?? null,
    }));

    return users;
}