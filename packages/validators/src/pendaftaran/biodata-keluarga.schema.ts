import { z } from "zod";
import { namaLengkapField, nikField, tempatLahirField, tanggalLahirField, tipeHubunganField, statusHidupField, phoneField } from "../core/personal-field"; 
import { pekerjaanField, pendidikanField, penghasilanField } from "../core/background-field";

export const biodataKeluargaSchema = z
  .object({
    namaLengkap: namaLengkapField,
    tipeHubungan: tipeHubunganField,
    statusHidup: statusHidupField,
    noHpKeluarga: phoneField,
    nikKeluarga: nikField,
    tempatLahirKeluarga: tempatLahirField,
    tanggalLahirKeluarga: tanggalLahirField,
    pendidikanKeluarga: pendidikanField,
    penghasilanKeluarga: penghasilanField,
    pekerjaanKeluarga: pekerjaanField
  });

export type BiodataKeluargaInput = z.infer<typeof biodataKeluargaSchema>;