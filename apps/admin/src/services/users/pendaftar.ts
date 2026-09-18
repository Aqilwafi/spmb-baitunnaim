// admin @/services/users/pendaftar.ts

import 'server-only';
import { createSupabaseServer } from '@bn/supabase/server';

export async function getAkunPendaftar(id: string) {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        

        

    
}