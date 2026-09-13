import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswaDetailSubmitInput } from "@bn/validators";
import type { FormSubmitResult } from "@/types/form.types";
import type { BaseRPCParams, BaseRPCSubmitResponse } from "@/types/rpc.types";

interface RPCParams extends BaseRPCParams {
  input: BiodataSiswaDetailSubmitInput;
}

export async function insertBiodataSiswaDetail({formId, input}: RPCParams): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_siswa_detail", {
    p_form_id: formId,
    p_nisn: input.nisn,
    p_no_kk: input.noKk,
    p_agama: input.agama,
    p_anak_ke: input.anakKe,
    p_jumlah_saudara: input.jumlahSaudara,
    p_hobi: input.hobi,
    p_cita_cita: input.citaCita,
    p_alamat: input.alamat,
    p_tinggal_bersama_id: input.tinggalBersamaId,
    p_status_rumah_id: input.statusRumahId,
    p_penyakit: input.penyakit,
  } as any);

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}