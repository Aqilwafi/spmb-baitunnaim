// @/services/detail.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { DetailPendaftaran } from "@/types/step.types";

export async function formDetailService(
  formId: string, 
  tahunAjaranId: number
): Promise<DetailPendaftaran | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_form_detail", {
      p_form_id: formId,
      p_tahun_ajaran_id: tahunAjaranId,
    })
    .maybeSingle();

  if (error) return null

  return data;
}