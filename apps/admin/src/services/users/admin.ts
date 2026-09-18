// admin @/services/users/list-admin.ts

import 'server-only';
import { createSupabaseServer } from '@bn/supabase/server';

export async function getAkunAdmin() {
    const supabase = await createSupabaseServer();

    const {data, error} = await supabase
        .from('profiles')
        .select('id')

    
}