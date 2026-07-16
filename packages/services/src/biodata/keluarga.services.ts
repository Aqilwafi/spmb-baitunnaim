// packages/services/src/siswa/siswa.services.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getBiodataKeluargaAllData() {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('*')
    .is('deleted_at', null);
  
  if (error) return [];
    
  return data || [];
}

export async function getBiodataKeluarga() {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select('id, nama_lengkap, nik, status_hidup, no_hp, relation_type, detail_relation_type, pekerjaan, pendidikan_terakhir, tanggal_lahir, tempat_lahir, alamat, updated_at, biodata_siswa_id')
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

// id bio_sis_detail = bio_sis
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