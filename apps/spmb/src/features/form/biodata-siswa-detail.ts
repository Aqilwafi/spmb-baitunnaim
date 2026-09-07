import { biodataSiswaDetailSubmitSchema } from "@bn/validators";
import { submitBiodataSiswaDetail } from "@/services/biodata-siswa-detail";
import type { SubmitBiodataSiswaDetailResult } from "@/services/biodata-siswa-detail";
import { getTinggalBersamaOptions, getStatusRumahOptions } from "../master/options";

interface ProcessSubmitBiodataSiswaDetailInput {
  formId: string;
  // stepId dihapus
  rawPayload: unknown;
}

export async function processSubmitBiodataSiswaDetail(
  input: ProcessSubmitBiodataSiswaDetailInput
): Promise<SubmitBiodataSiswaDetailResult> {
  const parsed = biodataSiswaDetailSubmitSchema.safeParse(input.rawPayload);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Data tidak valid.");
  }

  const data = parsed.data;

  return submitBiodataSiswaDetail({
    formId: input.formId,
    nisn: data.nisn,
    noKk: data.noKk,
    agama: data.agama,
    anakKe: data.anakKe,
    jumlahSaudara: data.jumlahSaudara,
    hobi: data.hobi,
    citaCita: data.citaCita,
    alamat: data.alamat,
    tinggalBersamaId: data.tinggalBersamaId,
    statusRumahId: data.statusRumahId,
    penyakit: data.penyakit,
  });
}

export async function getMasterData() {
    const [statusRumahOptions, tinggalBersamaOptions] = await Promise.all([
        getStatusRumahOptions(),
        getTinggalBersamaOptions()
    ]);
    return {
        statusRumahOptions,
        tinggalBersamaOptions
    };
}