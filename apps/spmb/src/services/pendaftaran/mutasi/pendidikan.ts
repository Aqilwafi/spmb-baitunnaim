import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { PendidikanSebelumnyaInput } from "@bn/validators";
import type { FormSubmitResult } from "@/types/form.types";
import type { BaseRPCParams, BaseRPCSubmitResponse,  } from "@bn/types";

interface RPCParams extends BaseRPCParams {
  input: PendidikanSebelumnyaInput;
}

export async function insertPendidikanSebelumnya({formId, input}: RPCParams): Promise<FormSubmitResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_submit_pendidikan_siswa_sebelumnya", {
    p_form_id: formId,
    p_nama_sekolah: input.namaSekolah,
    p_npsn: input.npsn,
    p_alamat_sekolah: input.alamatSekolah,
    p_tahun_lulus: input.tahunLulus,
    p_nilai_rata_rata: input.nilaiRataRata,
    p_catatan: input.catatan,
  } as any);

  if (error) throw error;

  const result = data as unknown as BaseRPCSubmitResponse;

  return {
    success: result.success,
    formId: result.form_id,
    nextStepId: result.next_step_id,
  };
}