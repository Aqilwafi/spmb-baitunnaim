// features/form/display-form.ts

import { getFormPendaftaranBySiswaIds } from '@/services/form';
import { getBiodataSiswaByOwner } from '@/services/siswa';
import { getMasterStep } from '@bn/services';
import type { FormPendaftaranDisplayItem, MasterData, MasterTahunAjaranListItem } from '@bn/types';
import { mapStepOptions, formatDateTimeId } from "@bn/utils";

async function getSteps(): Promise<MasterData[]> {
  const data = await getMasterStep();
  return mapStepOptions(data);
}

export type FormPendaftaranDisplayCard = FormPendaftaranDisplayItem & {
  lembagaLabel: string;
  kelasLabel: string;
  stepLabel: string;
};

export async function getFormPendaftaranDisplayCards(
  userId: string,
  tahunAjaranAktif: MasterTahunAjaranListItem,
): Promise<FormPendaftaranDisplayItem[]> {
  const siswaList = await getBiodataSiswaByOwner(userId);

  if (siswaList.length === 0) {
    return [];
  }

  const siswaIds = siswaList.map((s) => s.id);
  const formList = await getFormPendaftaranBySiswaIds(siswaIds, tahunAjaranAktif.id);

  // Lookup map biar gampang cari biodata siswa per form
  const siswaMap = new Map(siswaList.map((s) => [s.id, s]));

  return formList.map((form) => {
    const siswa = siswaMap.get(form.biodata_siswa_id)!; // pasti ada, karena query pakai id yang sama

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

export async function getFormPendaftaranForDashboard(
  userId: string,
  tahunAjaranAktif: MasterTahunAjaranListItem,
  kelasOptions: MasterData[],
  lembagaOptions: MasterData[],
): Promise<FormPendaftaranDisplayCard[]> {
  const [raw, steps] = await Promise.all([
    getFormPendaftaranDisplayCards(userId, tahunAjaranAktif),
    getSteps(),
  ]);

  return raw.map((form) => ({
    ...form,
    lembagaLabel: lembagaOptions.find((o) => o.value === form.lembaga_id)?.label ?? '-',
    kelasLabel: kelasOptions.find((o) => o.value === form.kelas_id)?.label ?? '-',
    stepLabel: steps.find((o) => o.value === form.step_id)?.label ?? '-',
    updatedAtFormatted: formatDateTimeId(form.updated_at),
  }));
}