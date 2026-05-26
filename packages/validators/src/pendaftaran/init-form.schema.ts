import { z } from "zod";
import { namaLengkapField, nikField, tempatLahirField, tanggalLahirField, genderField } from "../core/personal-field"; 
import { lembagaField, kelasField } from "../core/academic-field";

export const initFormSchema = z
  .object({
    namaLengkap: namaLengkapField,
    gender: genderField,
    nikSiswa: nikField,
    tempatLahirSiswa: tempatLahirField,
    tanggalLahirSiswa: tanggalLahirField,
    lembagaTujuan: lembagaField,
    kelas: kelasField
  });

export type InitFormInput = z.infer<typeof initFormSchema>;