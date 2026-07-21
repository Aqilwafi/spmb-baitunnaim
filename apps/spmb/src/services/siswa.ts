// @/services/siswa.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { BiodataSiswa } from "@bn/types";

export async function getBiodataSiswaByIds(ids: string[]): Promise<BiodataSiswa[]>{

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .in('id', ids)
    .is('deleted_at', null);
  
  if (error) return [];
    
  return data;
}