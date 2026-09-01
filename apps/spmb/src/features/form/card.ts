// features/form/card.ts

import { getCurrentClaims } from "@bn/auth";
import {
  getBiodataSiswaByOwnerId,
  getFormPendaftaranBySiswaIds,
  getMasterStep,
  getMasterLembaga,
  getMasterKelas,
} from "@bn/services";
import type { FormCardsData } from "@/types/form.types";
import { formatDateTimeId } from "@bn/utils";

export async function getFormCardsData(
  tahunAjaranId: number
): Promise<FormCardsData[]> {
  const user = await getCurrentClaims();
  if (!user) return [];

  const siswaData = await getBiodataSiswaByOwnerId(user.sub);

  if (siswaData.length === 0) return [];

  const siswaIds = siswaData.map((siswa) => siswa.id);

  const [formData, masterStep, masterLembaga, masterKelas] =
    await Promise.all([
      getFormPendaftaranBySiswaIds(
        siswaIds,
        tahunAjaranId
      ),
      getMasterStep(),
      getMasterLembaga(),
      getMasterKelas(),
    ]);

  if (formData.length === 0) return [];

  return formData.map((form) => {
    const siswa = siswaData.find(
      (siswa) => siswa.id === form.biodata_siswa_id
    );

    const step = masterStep.find((s) => s.id === form.step_id);
    const lembaga = masterLembaga.find(
      (l) => l.id === siswa?.lembaga_id
    );
    const kelas = masterKelas.find(
      (k) => k.id === siswa?.kelas_id
    );

    return {
      id: form.id,
      nama_lengkap: siswa?.nama_lengkap ?? "Calon Siswa",
      lembaga_label: lembaga?.label ?? "-",
      kelas_label: kelas?.label ?? "-",
      step_label: step?.label ?? "-",
      registration_status: form.registration_status,
      admission_status: form.admission_status,
      updated_at: formatDateTimeId(form.updated_at),
    };
  });
}