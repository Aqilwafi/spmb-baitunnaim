
import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { InitFormStepDataRPCResponse } from '@/types/form.types';
import type { EnumGender } from "@bn/types";

export interface InitFormStepData {
  namaLengkap: string;
  nik: string;
  gender: EnumGender;
  tempatLahir: string;
  tanggalLahir: string;
  lembagaTujuan: string | null;
  kelas: string | null;
}

export async function getInitForm(formId: string, tahunAjaranId: number): Promise<InitFormStepData | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_init_form_step_data", {
      p_form_id: formId,
      p_tahun_ajaran_id: tahunAjaranId,
    })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const rawData = data as unknown as InitFormStepDataRPCResponse;

  return {
    namaLengkap: rawData.nama_lengkap,
    nik: rawData.nik,
    gender: rawData.jenis_kelamin,
    tempatLahir: rawData.tempat_lahir,
    tanggalLahir: rawData.tanggal_lahir,
    lembagaTujuan: rawData.lembaga_tujuan,
    kelas: rawData.kelas,
  };
}