// services/init-form.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { EnumGender } from "@bn/types";

export interface InitFormRPCResponse {
  form_id: string;
  siswa_id: string;
}

export interface InitFormStepDataRPCResponse {
  nama_lengkap: string;
  nik: string;
  jenis_kelamin: EnumGender;
  tempat_lahir: string;
  tanggal_lahir: string;
  lembaga_tujuan: string | null;
  kelas: string | null;
}

export async function initFormPendaftaranService(params: {
  nik: string;
  namaLengkap: string;
  gender: EnumGender;
  tempatLahir: string;
  tanggalLahir: string;
  lembagaId: number;
  kelasId: number | null;
  tahunAjaranId: number;
  stepId: number;
}): Promise<InitFormRPCResponse> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_init_form", {
    p_nik: params.nik,
    p_nama_lengkap: params.namaLengkap,
    p_gender: params.gender,
    p_tempat_lahir: params.tempatLahir,
    p_tanggal_lahir: params.tanggalLahir,
    p_lembaga_id: params.lembagaId,
    p_kelas_id: params.kelasId ?? undefined,
    p_tahun_ajaran_id: params.tahunAjaranId,
    p_step_id: params.stepId,
  });

  if (error) throw error;

  return data as unknown as InitFormRPCResponse;
}

export async function initFormStepDataService(
  formId: string,
  tahunAjaranId: number
): Promise<InitFormStepDataRPCResponse | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_init_form_step_data", {
      p_form_id: formId,
      p_tahun_ajaran_id: tahunAjaranId,
    })
    .maybeSingle();

  if (error) throw error;

  return data as InitFormStepDataRPCResponse | null;
}