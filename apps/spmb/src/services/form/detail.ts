// @/services/detail.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { DetailPendaftaran } from "@/types/form.types";

export async function getFormDetail(formId: string, tahunAjaranId: number): Promise<DetailPendaftaran> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('id, step_id')
    .eq('id', formId)
    .eq('tahun_ajaran_id', tahunAjaranId)
    .is('deleted_at', null)
    .single()
  
  if (error) throw error;

  return {
    id: data.id,
    stepId: data.step_id
  }
}
