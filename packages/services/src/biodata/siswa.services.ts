// packages/services/src/biodata/siswa.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { BiodataSiswa, BiodataSiswaDetail } from "@bn/types";

export async function getBiodataSiswa(): Promise<BiodataSiswa[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null);
  
  if (error) return [];
    
  return data;
}

export async function getBiodataSiswaByOwnerId(ownerId: string): Promise<BiodataSiswa[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null)
    .eq('owner_user_id', ownerId);
  
  if (error) return [];
    
  return data;
}

export async function getBiodataSiswaByIds(siswaIds: string[]): Promise<BiodataSiswa[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null)
    .in('id', siswaIds);
  
  if (error) return [];
    
  return data;
}

export async function getBiodataSiswaById(siswaId: string): Promise<BiodataSiswa | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null)
    .eq('id', siswaId)
    .single();
  
  if (error) return null;
    
  return data;
}

// id bio_sis_detail = bio_sis
export async function getBiodataSiswaDetailById(siswaId: string): Promise<BiodataSiswaDetail | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa_detail')
    .select('*')
    .is('deleted_at', null)
    .eq('id', siswaId)
    .single();
  
  if (error) return null;
    
  return data;
}