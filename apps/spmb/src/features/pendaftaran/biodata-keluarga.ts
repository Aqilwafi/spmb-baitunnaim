import { biodataKeluargaFormSchema } from "@bn/validators";
import { submitBiodataKeluarga } from "@/services/pendaftaran/biodata-keluarga";
import type { ActionResponse } from "@bn/types";

interface ProcessSubmitBiodataKeluargaInput {
  formId: string;
  rawPayload: unknown;
}

export async function processSubmitBiodataKeluarga(
  input: ProcessSubmitBiodataKeluargaInput
): Promise<ActionResponse> {
  // Parsing & Validasi menggunakan Zod Schema
  const parsed = biodataKeluargaFormSchema.safeParse(input.rawPayload);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    throw new Error(firstIssue?.message ?? "Data biodata keluarga tidak valid.");
  }

  const data = parsed.data;

  // Memanggil service layer untuk persistence ke DB/API
  return submitBiodataKeluarga({
    formId: input.formId,
    biodataSiswaId: data.biodataSiswaId,
    relationType: data.relationType,
    detailRelationType: data.detailRelationType,
    namaLengkap: data.namaLengkap,
    nik: data.nik,
    statusHidup: data.statusHidup,
    tempatLahir: data.tempatLahir,
    tanggalLahir: data.tanggalLahir,
    pekerjaan: data.pekerjaan,
    pendidikanTerakhir: data.pendidikanTerakhir,
    penghasilan: data.penghasilan,
    noHp: data.noHp,
    alamat: data.alamat,
  });
}