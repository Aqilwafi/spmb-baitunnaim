// @/services/form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getFormPendaftaranBySiswaIds(biodataSiswaIds: string[], tahunAjaranId: number) {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('id, biodata_siswa_id, updated_at, step_id, registration_status, admission_status')
    .in('biodata_siswa_id', biodataSiswaIds)
    .eq('tahun_ajaran_id', tahunAjaranId);

  if (error) {
    throw new Error(`Gagal mengambil data form pendaftaran: ${error.message}`);
  }

  return data;
}

