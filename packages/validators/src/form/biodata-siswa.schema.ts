import { z } from "zod";
import { noKkField, alamatField } from "../core/personal-field";
import { nisnField } from "../core/academic-field";
import { agamaField } from "../core/enum-field";
import { masterIdField } from "../core/master-id-field";
import {
  anakKeField,
  citaCitaField,
  hobiField,
  jumlahSaudaraField,
  penyakitField,
} from "../core/background-field";

export const biodataSiswaFormSchema = z
  .object({
    nisn: nisnField.optional().nullable(),
    catatan: z.string().trim().max(500).optional().nullable(),
    agama: agamaField.default("ISLAM"),
    noKk: noKkField,
    jumlahSaudara: jumlahSaudaraField,
    anakKe: anakKeField,
    hobi: hobiField,
    citaCita: citaCitaField,
    penyakit: penyakitField,
    alamat: alamatField,
    tinggalBersamaId: masterIdField("Tinggal bersama"),
    statusRumahId: masterIdField("Status rumah"),
  })
  // chk_nisn_or_reason
  .superRefine((data, ctx) => {
    if (!data.nisn && (!data.catatan || data.catatan.trim() === "")) {
      ctx.addIssue({
        code: "custom",
        path: ["catatan"],
        message: "Catatan wajib diisi jika NISN tidak tersedia",
      });
    }
  });

export type BiodataSiswaInput = z.infer<typeof biodataSiswaFormSchema>;