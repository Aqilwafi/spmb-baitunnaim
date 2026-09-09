// @spmb/src/helpers/mappers.ts

import { mapGenderCode } from "@bn/utils";

export function mapInitFormPayload(raw: Record<string, FormDataEntryValue>) {
  return {
    nik: (raw.nik as string) ?? "",
    namaLengkap: (raw.namaLengkap as string) ?? "",
    // Menggunakan mapGenderCode jika input select bernilai angka 1 / 2 atau kode
    gender: mapGenderCode(raw.gender as string),
    tempatLahir: (raw.tempatLahir as string) ?? "",
    tanggalLahir: (raw.tanggalLahir as string) ?? "",
    lembagaId: raw.lembagaId ? Number(raw.lembagaId) : undefined,
    kelasId: raw.kelasId ? Number(raw.kelasId) : undefined,
  };
}