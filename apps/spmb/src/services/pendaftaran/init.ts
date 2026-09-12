// spmb @/services/init-form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { InitFormInput } from "@bn/validators";
import type { BaseRPCSubmitResponse, FormSubmitResult } from "@bn/types";

export async function insertInitForm(params: InitFormInput): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_init_form", {
    p_nik: params.nik,
    p_nama_lengkap: params.namaLengkap,
    p_gender: params.gender,
    p_tempat_lahir: params.tempatLahir,
    p_tanggal_lahir: params.tanggalLahir,
    p_lembaga_id: params.lembagaId,
    p_kelas_id: params.kelasId ?? undefined,
  });

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}

