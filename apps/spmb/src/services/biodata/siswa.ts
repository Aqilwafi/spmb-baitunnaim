import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswaDetail } from "@bn/types";

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
