import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { EnumRelasiKeluarga, EnumStatusHidup, BiodataKeluarga, ActionResponse, BaseRPCSubmitResponse, FormSubmitResult} from "@bn/types";

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

export interface GetBiodataKeluargaParams {
  formId: string;
  relationType: EnumRelasiKeluarga;
}

export interface GetBiodataKeluargaResult {
  success: boolean;
  data?: BiodataKeluarga | null;
  message?: string;
  code?: string;
}

/**
 * Menyimpan / memperbarui data biodata keluarga (Ayah / Ibu / Wali)
 */
export async function submitBiodataKeluarga(
    formId: string,
    params: SubmitBiodataKeluargaParams
): Promise<ActionResponse<FormSubmitResult>> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_keluarga", {
    p_form_id: formId,
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

  if (error) {
    return {
      success: false,
      message: error.message,
      error: {
        code: error.code,
        details: error.details,
      }
    };
  }

  const result = data as BaseRPCSubmitResponse ;

  return {
    success: result.success,
    message: "",
    data: {
        formId: result.form_id,
        nextStepId: result?.next_step_id,
    }
  };
}

/**
 * Mengambil data biodata keluarga spesifik berdasarkan formId dan relationType
 */
// export async function getBiodataKeluarga(
//   params: GetBiodataKeluargaParams
// ): Promise<GetBiodataKeluargaResult> {
//   const supabase = await createSupabaseServer();

//   const { data, error } = await supabase.rpc("fn_rpc_get_biodata_keluarga", {
//     p_form_id: params.formId,
//     p_relation_type: params.relationType,
//   } as any);

//   if (error) {
//     return {
//       success: false,
//       message: error.message,
//       code: error.code,
//     };
//   }

//   const result = (data as BiodataKeluarga[])?.[0] ?? null;

//   return {
//     success: true,
//     data: result,
//   };
// }