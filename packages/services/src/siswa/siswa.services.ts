// packages/services/src/siswa/siswa.services.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getBiodataSiswa() {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('id, nik, nama_lengkap, jenis_kelamin, lembaga_id, kelas_id')
    .is('deleted_at', null);
  
  if (error) return [];
    
  return data || [];
}

export async function getBiodataSiswaById(SiswaId: string){

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('id, nik, nama_lengkap, jenis_kelamin, lembaga_id, kelas_id')
    .eq('id', SiswaId)
    .is('deleted_at', null)
    .single();
  
  if (error) return null;
    
  return data ||  null;
}

export async function getBiodataSiswaDetailById(SiswaId: string){

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa_detail')
    .select('id, no_kk, status_rumah_id, tinggal_bersama_id, anak_ke, jumlah_saudara, agama, alamat')
    .eq('id', SiswaId)
    .is('deleted_at', null)
    .single();
  
  if (error) return null;
    
  return data ||  null;
}