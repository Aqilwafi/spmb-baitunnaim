// @/services/siswa.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { NamaSiswa } from "@/types/step.types";
import type { BiodataSiswa } from "@bn/types";

export async function getNamaLengkapById(id: string): Promise<NamaSiswa|null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('nama_lengkap')
    .is('deleted_at', null)
    .eq('id', id)
    .single();
  
  if (error) return null;
    
  return data;
}

export async function getBiodataSiswaById(id: string): Promise<BiodataSiswa|null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null)
    .eq('id',id)
    .single()

  if (error) return null;

  return data;
  
}
