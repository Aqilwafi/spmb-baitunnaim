
import 'server-only';
import { supabaseAdmin } from '@bn/supabase/admin';

export async function loginLogger() {

    const supabase = supabaseAdmin;

    const { data, error } = await supabase
        .from('dokumen')
        .select('*')
        
    if (error) throw error;
}