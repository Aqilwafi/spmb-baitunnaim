// @spmb/src/helpers/mappers.ts

import { mapGenderCode } from "@bn/utils";

export function mapInitFormPayload(raw: Record<string, FormDataEntryValue>) {
  return {
    nik: raw.nik,
    namaLengkap: raw.nama_lengkap,
    gender: mapGenderCode(raw.jenis_kelamin),
    tempatLahir: raw.tempat_lahir,
    tanggalLahir: raw.tanggal_lahir,
    lembagaId: raw.lembaga_tujuan_id,
    kelasId: raw.kelas_mi_id || undefined,
  };
}