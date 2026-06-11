// services/dashboardService.ts
import "server-only";
import  { AppSupabaseClient }  from "@bn/supabase";
import { MasterTahunAjaranListItem, FormPendaftaranListItem } from "@bn/types"

type SiswaReference = {
    id: string,
    nama: string
}

export async function getSiswaIdByUserId(supabase: AppSupabaseClient, userid: string): Promise<SiswaReference []> {
    
    const { data, error } = await supabase
        .from("biodata_siswa")
        .select("id, nama_lengkap")
        .eq("akun_pendaftar_id", userid)

    if (error) {
        throw new Error(
        `Gagal mengambil data master kelas: ${error.message}`
        );
    }

    return (data ?? []).map((s) => ({
        id: s.id,
        nama: s.nama_lengkap,
    }));  

}

export async function getFormPendaftaranBySiswaId(supabase: AppSupabaseClient, siswaId: string, tahunAjaranAktif: MasterTahunAjaranListItem): Promise<FormPendaftaranListItem[]> {

  const { data: formPendaftaran, error } = await supabase
    .from("form_pendaftaran")
    .select("id, master_lembaga_code, master_kelas_code, master_step_id, status_keputusan_final_pendaftaran, updated_at")
    .eq('siswa_id', siswaId)
    .eq('tahun_ajaran_code', tahunAjaranAktif.code);

  if (error) {
    throw new Error(
      `Gagal mengambil data master kelas: ${error.message}`
    );
  }

  return formPendaftaran;
}

