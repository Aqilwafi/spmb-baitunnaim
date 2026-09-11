import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type {
  EnumRelasiKeluarga,
  EnumStatusHidup,
  BiodataKeluarga,
} from "@bn/types";

// Types
export interface SubmitBiodataKeluargaParams {
  formId: string;
  relationType: EnumRelasiKeluarga; // "AYAH" | "IBU" | "WALI"
  namaLengkap: string;
  statusHidup?: EnumStatusHidup; // "HIDUP" | "MENINGGAL"
  detailRelationType?: string | null;
  nik?: string | null;
  tempatLahir?: string | null;
  tanggalLahir?: string | null;
  pekerjaan?: string | null;
  pendidikanTerakhir?: string | null;
  penghasilan?: string | null;
  noHp?: string | null;
  alamat?: string | null;
  sameAddressAs?: EnumRelasiKeluarga | null;
}

export interface SubmitBiodataKeluargaResult {
  success: boolean;
  nextStep?: number;
  message?: string;
  code?: string;
}

/**
 * Menyimpan / memperbarui data biodata keluarga (Ayah / Ibu / Wali)
 */
export async function submitBiodataKeluarga(
  params: SubmitBiodataKeluargaParams
): Promise<SubmitBiodataKeluargaResult> {
  const supabase = await createSupabaseServer();

  console.log("input:", params);

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_keluarga", {
    p_form_id: params.formId,
    p_relation_type: params.relationType,
    p_nama_lengkap: params.namaLengkap,
    p_status_hidup: params.statusHidup ?? "HIDUP",
    p_detail_relation_type: params.detailRelationType ?? null,
    p_nik: params.nik ?? null,
    p_tempat_lahir: params.tempatLahir ?? null,
    p_tanggal_lahir: params.tanggalLahir ?? null,
    p_pekerjaan: params.pekerjaan ?? null,
    p_pendidikan_terakhir: params.pendidikanTerakhir ?? null,
    p_penghasilan: params.penghasilan ?? null,
    p_no_hp: params.noHp ?? null,
    p_alamat: params.alamat ?? null,
    p_same_address_as: params.sameAddressAs ?? null,
  } as any);

  console.log("data:", data);
  console.log("error:", error);

  if (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }

  const result = data as { success: boolean; next_step: number };

  console.log("result:", result);

  return {
    success: result.success,
    nextStep: result.next_step,
  };
}