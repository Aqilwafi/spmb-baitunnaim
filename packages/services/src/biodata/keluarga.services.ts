// packages/services/src/biodata/keluarga.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { BiodataKeluarga } from "@bn/types";

export async function getBiodataKeluargaBySiswaId(siswaId: string): Promise<BiodataKeluarga[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select('*')
    .is('deleted_at', null)
    .eq('biodata_siswa_id', siswaId);
  
  if (error) return [];
    
  return data;
}

export async function getBiodataAyahBySiswaId(siswaId: string): Promise<BiodataKeluarga | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select('*')
    .is('deleted_at', null)
    .eq('biodata_siswa_id', siswaId)
    .eq('relation_type', 'AYAH')
    .single();
  
  if (error) return null;
    
  return data;
}

export async function getBiodataIbuBySiswaId(siswaId: string): Promise<BiodataKeluarga | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select('*')
    .is('deleted_at', null)
    .eq('biodata_siswa_id', siswaId)
    .eq('relation_type', 'IBU')
    .single();
  
  if (error) return null;
    
  return data;
}

export async function getBiodataWaliBySiswaId(siswaId: string): Promise<BiodataKeluarga | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select('*')
    .is('deleted_at', null)
    .eq('biodata_siswa_id', siswaId)
    .eq('relation_type', 'WALI')
    .single();
  
  if (error) return null;
    
  return data;
}