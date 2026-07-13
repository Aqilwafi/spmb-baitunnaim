// services/siswa/siswa.services.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import { BiodataSiswaListItem } from "@bn/types";


export async function getBiodataSiswaByOwner(
  supabase: AppSupabaseClient,
  userId: string
): Promise<BiodataSiswaListItem[]> {
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select('id, nik, nama_lengkap, jenis_kelamin, lembaga_id, kelas_id')
    .eq('owner_user_id', userId)
    .is('deleted_at', null);

  if (error) {
    throw new Error(`Gagal mengambil data biodata siswa: ${error.message}`);
  }
  return data;
}