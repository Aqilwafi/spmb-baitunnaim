import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataKeluargaInput } from "@bn/validators";
import type { FormSubmitResult } from "@/types/form.types";
import type { BaseRPCParams, BaseRPCSubmitResponse } from "@/types/rpc.types";

interface RPCParams extends BaseRPCParams {
  input: BiodataKeluargaInput;
}

export async function insertBiodataKeluarga({formId, input}: RPCParams): Promise<FormSubmitResult> {
  
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_keluarga", {
    p_form_id: formId,
    p_relation_type: input.relationType,
    p_nama_lengkap: input.namaLengkap,
    p_status_hidup: input.statusHidup,
    p_detail_relation_type: input.detailRelationType,
    p_nik: input.nik,
    p_tempat_lahir: input.tempatLahir,
    p_tanggal_lahir: input.tanggalLahir,
    p_pekerjaan: input.pekerjaan,
    p_pendidikan_terakhir: input.pendidikanTerakhir,
    p_penghasilan: input.penghasilan,
    p_no_hp: input.noHp,
  } as any);

  if (error) throw error;

  const result = data as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}