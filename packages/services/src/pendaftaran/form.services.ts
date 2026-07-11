// // @bn/services/src/pendafat/masterService.ts

// import "server-only";
// import type { AppSupabaseClient } from "@bn/supabase";
// import { FormPendaftaranListItem, MasterTahunAjaranListItem } from "@bn/types";

// export async function getFormPendaftaran(supabase: AppSupabaseClient, tahunAjaranAktif: MasterTahunAjaranListItem): Promise<FormPendaftaranListItem[]> {

//   const { data: formPendaftaran, error } = await supabase
//     .from("form_pendaftaran")
//     .select("id, master_lembaga_code, master_kelas_code, master_step_id, status_keputusan_final_pendaftaran, updated_at")
//     .eq('tahun_ajaran_code', tahunAjaranAktif.code);

//   if (error) {
//     throw new Error(
//       `Gagal mengambil data master kelas: ${error.message}`
//     );
//   }

//   return formPendaftaran;
// }

// export async function getFormPendaftaranBySiswaId(supabase: AppSupabaseClient, siswaId: string, tahunAjaranAktif: MasterTahunAjaranListItem): Promise<FormPendaftaranListItem[]> {

//   const { data: formPendaftaran, error } = await supabase
//     .from("form_pendaftaran")
//     .select("id, master_lembaga_code, master_kelas_code, master_step_id, status_keputusan_final_pendaftaran, updated_at")
//     .eq('siswa_id', siswaId)
//     .eq('tahun_ajaran_code', tahunAjaranAktif.code);

//   if (error) {
//     throw new Error(
//       `Gagal mengambil data master kelas: ${error.message}`
//     );
//   }

//   return formPendaftaran;
// }