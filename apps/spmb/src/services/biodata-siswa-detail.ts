import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { EnumAgama } from "@bn/types";

export interface SubmitBiodataSiswaDetailParams {
  formId: string;
  // stepId dihapus dari params
  nisn: string;
  noKk: string;
  agama: EnumAgama;
  anakKe: number;
  jumlahSaudara: number;
  hobi: string;
  citaCita: string;
  alamat: string;
  tinggalBersamaId: number;
  statusRumahId: number;
  penyakit?: string | null;
}

export interface SubmitBiodataSiswaDetailResult {
  success: boolean;
  nextStep: number;
}

export async function submitBiodataSiswaDetail(
  params: SubmitBiodataSiswaDetailParams
): Promise<SubmitBiodataSiswaDetailResult> {
  const supabase = await createSupabaseServer();
  console.log("submitBiodataSiswaDetail: calling RPC with params:", params);

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_siswa_detail", {
    p_form_id: params.formId,
    p_nisn: params.nisn,
    p_no_kk: params.noKk,
    p_agama: params.agama,
    p_anak_ke: params.anakKe,
    p_jumlah_saudara: params.jumlahSaudara,
    p_hobi: params.hobi,
    p_cita_cita: params.citaCita,
    p_alamat: params.alamat,
    p_tinggal_bersama_id: params.tinggalBersamaId,
    p_status_rumah_id: params.statusRumahId,
    p_penyakit: params.penyakit ?? null, // Wajib null agar key p_penyakit tidak di-omit PostgREST
  } as any);

  if (error) {
    throw new Error(error.message);
  }

  const result = data as { success: boolean; next_step: number };

  return {
    success: result.success,
    nextStep: result.next_step,
  };
}