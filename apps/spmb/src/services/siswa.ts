// @/services/siswa.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getBiodataSiswaByOwner(userId: string){

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('id, nik, nama_lengkap, jenis_kelamin, lembaga_id, kelas_id')
    .eq('owner_user_id', userId)
    .is('deleted_at', null);
  
  if (error) return [];
    
  return data || [];
}