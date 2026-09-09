import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { EnumAgama, BiodataSiswaDetail } from "@bn/types";

// Extends tipe BiodataSiswaDetail dengan NISN (diambil dari tabel biodata_siswa)
export type BiodataSiswaDetailResultData = Pick<
  BiodataSiswaDetail,
  | "no_kk"
  | "agama"
  | "anak_ke"
  | "jumlah_saudara"
  | "hobi"
  | "cita_cita"
  | "penyakit"
  | "alamat"
  | "tinggal_bersama_id"
  | "status_rumah_id"
> & {
  nisn: string | null;
};

export interface GetBiodataSiswaDetailParams {
  formId: string;
}

export interface GetBiodataSiswaDetailResult {
  success: boolean;
  data?: BiodataSiswaDetailResultData | null;
  message?: string;
  code?: string;
}

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
 * Mengambil detail biodata siswa berdasarkan formId
 */
export async function getBiodataSiswaDetail(
  params: GetBiodataSiswaDetailParams
): Promise<GetBiodataSiswaDetailResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_get_biodata_siswa_detail", {
    p_form_id: params.formId,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }

  // Karena RPC RETURNS TABLE, data yang dikembalikan berupa array [row]
  const result = (data as BiodataSiswaDetailResultData[])?.[0] ?? null;

  return {
    success: true,
    data: result,
  };
}

/**
 * Menyimpan / memperbarui detail biodata siswa
 */
export async function submitBiodataSiswaDetail(
  params: SubmitBiodataSiswaDetailParams
): Promise<SubmitBiodataSiswaDetailResult> {
  const supabase = await createSupabaseServer();

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

  if (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }

  const result = data as { success: boolean; next_step: number };

  return {
    success: result.success,
    nextStep: result.next_step,
  };
}