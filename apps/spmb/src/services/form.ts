// services/form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { FormPendaftaran } from "@bn/types";
import { FormPartial } from "@/types/step.types";

export async function getPartFormPendaftaranByPendaftarIdAndTahunAjaranId(pendaftarId: string, tahunAjaranId: number): Promise<FormPartial|null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('id, admission_status, step_id, biodata_siswa_id')
    .is('deleted_at', null)
    .eq('pendaftar_id', pendaftarId)
    .eq('tahun_ajaran_id', tahunAjaranId)
    .single();

  if (error) return null;

  return data;
}