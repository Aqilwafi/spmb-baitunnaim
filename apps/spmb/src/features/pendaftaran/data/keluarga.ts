import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { EnumRelasiKeluarga } from "@bn/types";
import type { BiodataKeluargaItemData } from "@/types/biodata.types";
import type { RPCGetBiodataKeluarga, BaseRPCParams} from "@/types/rpc.types";

interface RPCParams extends BaseRPCParams {
    relationType: EnumRelasiKeluarga
}

export async function getBiodataKeluargaData({formId, relationType}: RPCParams): Promise<BiodataKeluargaItemData|null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc('fn_rpc_get_biodata_keluarga', {
    p_form_id: formId,
    p_relation_type: relationType,
  })
  .maybeSingle<RPCGetBiodataKeluarga>();

  if (error) throw error;
  if (!data) return null;
  
  return {
    relationType: data.relation_type,
    detailRelationType: data.detail_relation_type,
    namaLengkap: data.nama_lengkap,
    nik: data.nik,
    statusHidup: data.status_hidup,
    tempatLahir: data.tempat_lahir,
    tanggalLahir: data.tanggal_lahir,
    pekerjaan: data.pekerjaan,
    pendidikanTerakhir: data.pendidikan_terakhir,
    penghasilan: data.penghasilan,
    noHp: data.no_hp,
    alamat: data.alamat,
  };
}
