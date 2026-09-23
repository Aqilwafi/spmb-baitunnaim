// admin @/services/users/verifikator.ts

import 'server-only';
import { createSupabaseServer } from '@bn/supabase/server';
import type { Profiles } from '@bn/types';

interface VerifikatorName {
    id: Profiles['id'];
    email: Profiles['email'];
    username: Profiles['username'];
}

export async function getUsernames(userIds: string[]): Promise<VerifikatorName[]> {
    const supabase = await createSupabaseServer();

    // 1. Ambil data dari tabel profiles berdasarkan array userIds
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, email') 
        .in('id', userIds);

    if (error) {
        throw error;
    }
    if (!data) {
        return [];
    }

    return data.map((item) => ({
        id: item.id,
        email: item.email,
        username: item.username,
    }));
}