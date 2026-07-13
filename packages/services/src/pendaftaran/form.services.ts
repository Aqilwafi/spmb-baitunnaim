// @bn/services/src/pendafat/masterService.ts

import "server-only";
import { getBiodataSiswaByOwner } from "../siswa/siswa.services";
import type { AppSupabaseClient } from "@bn/supabase";
import { FormPendaftaranDisplayItem, FormPendaftaranListItem, MasterTahunAjaranListItem } from "@bn/types";

async function getFormPendaftaranBySiswaIds(
  supabase: AppSupabaseClient,
  biodataSiswaIds: string[],
  tahunAjaranId: number
): Promise<FormPendaftaranListItem[]> {
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('id, biodata_siswa_id, updated_at, step_id, registration_status, admission_status')
    .in('biodata_siswa_id', biodataSiswaIds)
    .eq('tahun_ajaran_id', tahunAjaranId);

  if (error) {
    throw new Error(`Gagal mengambil data form pendaftaran: ${error.message}`);
  }
  return data;
}

export async function getFormPendaftaranDisplayCards(
  supabase: AppSupabaseClient,
  userId: string,
  tahunAjaranAktif: MasterTahunAjaranListItem
): Promise<FormPendaftaranDisplayItem[]> {
  const siswaList = await getBiodataSiswaByOwner(supabase, userId);

  if (siswaList.length === 0) {
    return [];
  }

  const siswaIds = siswaList.map((s) => s.id);
  const formList = await getFormPendaftaranBySiswaIds(supabase, siswaIds, tahunAjaranAktif.id);

  // Buat lookup map biar gampang cari biodata siswa per form
  const siswaMap = new Map(siswaList.map((s) => [s.id, s]));

  return formList.map((form) => {
    const siswa = siswaMap.get(form.biodata_siswa_id)!; // pasti ada, karena kita query pakai id yang sama

    return {
      ...form,
      nik: siswa.nik,
      nama_lengkap: siswa.nama_lengkap,
      jenis_kelamin: siswa.jenis_kelamin,
      lembaga_id: siswa.lembaga_id,
      kelas_id: siswa.kelas_id,
    };
  });
}