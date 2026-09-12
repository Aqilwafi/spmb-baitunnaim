// @/services/detail.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { DetailPendaftaran } from "@/types/step.types";

export async function getFormDetail(formId: string, tahunAjaranId: number): Promise<DetailPendaftaran> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_form_detail", {
      p_form_id: formId,
      p_tahun_ajaran_id: tahunAjaranId,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error("Detail pendaftaran tidak ditemukan.");

  return {
    id: data.id,
    namaLengkap: data.nama_lengkap,
    biodataSiswaId: data.biodata_siswa_id,
    stepId: data.step_id,
    admissionStatus: data.admission_status,
    pendaftarId: data.pendaftar_id,
  };
}