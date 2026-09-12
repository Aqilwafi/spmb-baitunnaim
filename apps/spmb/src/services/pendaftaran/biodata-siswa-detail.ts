import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { ProcessFormInput } from "@/types/form.types";
import type { BiodataSiswaDetailSubmitInput } from "@bn/validators";
import type { FormSubmitResult, BaseRPCSubmitResponse } from "@bn/types";

export async function insertBiodataSiswaDetail(formId: string, params: BiodataSiswaDetailSubmitInput): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_biodata_siswa_detail", {
    p_form_id: formId,
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

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}