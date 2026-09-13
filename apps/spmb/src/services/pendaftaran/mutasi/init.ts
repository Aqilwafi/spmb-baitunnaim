// spmb @/services/init-form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { InitFormInput } from "@bn/validators";
import type { FormSubmitResult } from "@/types/form.types";
import type { BaseRPCSubmitResponse } from "@/types/rpc.types";

export async function insertInitForm(input: InitFormInput): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_init_form", {
    p_nik: input.nik,
    p_nama_lengkap: input.namaLengkap,
    p_gender: input.gender,
    p_tempat_lahir: input.tempatLahir,
    p_tanggal_lahir: input.tanggalLahir,
    p_lembaga_id: input.lembagaId,
    p_kelas_id: input.kelasId,
  } as any);

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}

