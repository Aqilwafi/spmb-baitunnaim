import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { PendidikanSiswaItemData } from "@/types/biodata.types";
import type { BaseRPCParams, RPCGetPendidikanSiswaSebelumnya} from "@/types/rpc.types";

export async function getPendidikanSiswaSebelumnya({formId}: BaseRPCParams): Promise<PendidikanSiswaItemData|null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc('fn_rpc_get_pendidikan_siswa_sebelumnya', {
    p_form_id: formId,
  })
  .maybeSingle<RPCGetPendidikanSiswaSebelumnya>();

  if (error) throw error;
  if (!data) return null
  
  return {
    namaSekolah: data.nama_sekolah,
    alamatSekolah: data.alamat_sekolah,
    npsn: data.npsn,
    tahunLulus: data.tahun_lulus,
    nilaiRataRata: data.nilai_rata_rata,
    catatan: data.catatan,
  };
}
