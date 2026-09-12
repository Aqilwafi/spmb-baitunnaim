import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataKeluargaInput } from "@bn/validators";
import type { FormSubmitResult, BaseRPCSubmitResponse } from "@bn/types";

export async function insertBiodataKeluarga(formId: string, params: BiodataKeluargaInput): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  console.log("input:", params);

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_keluarga", {
    p_form_id: formId,
    p_relation_type: params.relationType,
    p_nama_lengkap: params.namaLengkap,
    p_status_hidup: params.statusHidup,
    p_detail_relation_type: params.detailRelationType,
    p_nik: params.nik,
    p_tempat_lahir: params.tempatLahir,
    p_tanggal_lahir: params.tanggalLahir,
    p_pekerjaan: params.pekerjaan,
    p_pendidikan_terakhir: params.pendidikanTerakhir,
    p_penghasilan: params.penghasilan,
    p_no_hp: params.noHp,
  } as any);

  if (error) throw error;

  const result = data as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}