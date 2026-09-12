import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { PendidikanSebelumnyaInput } from "@bn/validators";
import type { FormSubmitResult, BaseRPCSubmitResponse } from "@bn/types";

export async function insertPendidikanSebelumnya(formId: string, params: PendidikanSebelumnyaInput): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_pendidikan_siswa_sebelumnya", {
    p_form_id: formId,
    p_nama_sekolah: params.namaSekolah,
    p_npsn: params.npsn,
    p_alamat_sekolah: params.alamatSekolah,
    p_tahun_lulus: params.tahunLulus,
    p_nilai_rata_rata: params.nilaiRataRata,
    p_catatan: params.catatan,
  } as any);

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}