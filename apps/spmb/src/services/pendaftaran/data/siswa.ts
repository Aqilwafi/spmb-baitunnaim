import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswaDetailItemData } from "@/types/biodata.types";
import type { BaseRPCParams } from "@bn/types";

export async function getBiodataSiswaDetail({formId}: BaseRPCParams): Promise<BiodataSiswaDetailItemData|null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("fn_rpc_get_biodata_siswa_detail", {
    p_form_id: formId,
  })
  .maybeSingle();

  if (error) throw error;
  if (!data) return null
  
  return {
    noKk: data.no_kk as string,
    agama: data.agama,
    anakKe: data.anak_ke,
    jumlahSaudara: data.jumlah_saudara,
    hobi: data.hobi,
    citaCita: data.cita_cita,
    penyakit: data.penyakit,
    alamat: data.alamat,
    tinggalBersamaId: data.tinggal_bersama_id,
    statusRumahId: data.status_rumah_id,
    nisn: data.nisn as string,
  };
}
