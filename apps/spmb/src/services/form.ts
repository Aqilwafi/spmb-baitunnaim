// services/form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { FormPendaftaran } from "@bn/types";
import { FormPartial } from "@/types/step.types";

export async function getPartFormPendaftaranByFormIdAndTahunAjaranId(formId: string, pendaftarId: string, tahunAjaranId: number): Promise<FormPartial|null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('id, admission_status, step_id, biodata_siswa_id')
    .is('deleted_at', null)
    .eq('id', formId)
    .eq('pendaftar_id', pendaftarId)
    .eq('tahun_ajaran_id', tahunAjaranId)
    .single();
  
  if (error) return null;

  return data;
}

export async function getBiodataSiswaIdByFormId (id: string, tahunAjaranId: number): Promise<string|null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('biodata_siswa_id')
    .is('deleted_at', null)
    .eq('tahun_ajaran_id', tahunAjaranId)
    .eq('id', id)
    .single()
  
  if (error) return null;

  return data.biodata_siswa_id;

}