import { z } from "zod";
import {
  nikField,
  namaLengkapField,
  tempatLahirField,
  tanggalLahirField,
} from "../core/personal-field";
import { genderField } from "../core/enum-field";
import { masterIdField } from "../core/master-id-field";


export const initFormSchema = z.object({
  nik: nikField,
  namaLengkap: namaLengkapField,
  gender: genderField,
  tempatLahir: tempatLahirField,
  tanggalLahir: tanggalLahirField,
  lembagaId: masterIdField("Lembaga tujuan"),
  kelasId: masterIdField("Kelas").optional().nullable(),
});

export type InitFormInput = z.infer<typeof initFormSchema>;