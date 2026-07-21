// utils/mappers.ts

const GENDER_MAP: Record<string, 'MALE' | 'FEMALE'> = {
  '1': 'MALE',
  '2': 'FEMALE',
};

export function mapGenderCode(value: FormDataEntryValue | undefined): 'MALE' | 'FEMALE' | undefined {
  if (typeof value !== 'string') return undefined;
  return GENDER_MAP[value];
}

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