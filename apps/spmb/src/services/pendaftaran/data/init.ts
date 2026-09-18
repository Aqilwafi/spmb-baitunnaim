
import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { InitFormStepData } from "@/types/form.types";
import type { RPCGetInitResult, BaseRPCParams } from "@/types/rpc.types";

export async function getInitForm({formId}: BaseRPCParams): Promise<InitFormStepData> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_init_form_step_data", {
      p_form_id: formId,
    })
    .single<RPCGetInitResult>();

  if (error) throw error;

  return {
    namaLengkap: data.nama_lengkap,
    nik: data.nik,
    gender: data.jenis_kelamin,
    tempatLahir: data.tempat_lahir,
    tanggalLahir: data.tanggal_lahir,
    lembagaTujuan: data.lembaga_tujuan,
    kelas: data.kelas,
  };
}