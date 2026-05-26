import { z } from "zod";
import { agamaField, noKkField } from "../core/personal-field"; 
import { nisnField } from "../core/academic-field";
import { anakKeField, citaCitaField, hobiField, jumlahSaudaraField, penyakitField } from "../core/background-field";

export const biodataSiswaFormSchema = z
  .object({
    nisn: nisnField,
    agama: agamaField,
    noKk: noKkField,
    jumlahSaudara: jumlahSaudaraField,
    anakKe: anakKeField,
    hobi: hobiField,
    citaCita: citaCitaField,
    penyakit: penyakitField
  });

export type BiodataSiswaInput = z.infer<typeof biodataSiswaFormSchema>;