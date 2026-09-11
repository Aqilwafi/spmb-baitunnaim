import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { EnumAgama, BiodataSiswaDetail } from "@bn/types";

export interface SubmitBiodataSiswaDetailParams {
  formId: string;
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
  nextStep?: number;
  message?: string;
  code?: string;
}
/**
 * Menyimpan / memperbarui detail biodata siswa
 */
export async function submitBiodataSiswaDetail(
  params: SubmitBiodataSiswaDetailParams
): Promise<SubmitBiodataSiswaDetailResult> {
  const supabase = await createSupabaseServer();
console.log("input:", params)
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
    p_penyakit: params.penyakit ?? null,
  } as any);

  console.log("data:", data)
  console.log("error:", error)

  if (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }

  const result = data as { success: boolean; next_step: number };
console.log("result:", result)
  return {
    success: result.success,
    nextStep: result.next_step,
  };
}