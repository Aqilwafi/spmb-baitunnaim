// packages/validators/src/form/biodata-siswa-detail.schema.ts

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

/**
 * Base object schema, TANPA refine — supaya bisa di-extend/omit
 * oleh kedua varian di bawah tanpa duplikasi definisi field.
 */
const biodataSiswaBaseSchema = z.object({
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
});

/**
 * Varian UMUM — dipakai di form yang mengizinkan NISN kosong
 * asalkan ada alasan (catatan). Menegakkan chk_nisn_or_reason.
 */
export const biodataSiswaFormSchema = biodataSiswaBaseSchema.superRefine((data, ctx) => {
  if (!data.nisn && (!data.catatan || data.catatan.trim() === "")) {
    ctx.addIssue({
      code: "custom",
      path: ["catatan"],
      message: "Catatan wajib diisi jika NISN tidak tersedia",
    });
  }
});

export type BiodataSiswaInput = z.infer<typeof biodataSiswaFormSchema>;

/**
 * Varian SUBMIT (khusus step "Biodata Siswa Detail") — NISN WAJIB diisi.
 * Dipakai untuk RPC fn_rpc_submit_biodata_siswa_detail, yang selalu
 * meng-update biodata_siswa.catatan menjadi NULL (constraint chk_nisn_or_reason
 * sudah terpenuhi lewat NISN, bukan lagi lewat catatan).
 * `catatan` di-omit karena tidak relevan/tidak dikirim ke RPC ini.
 */
export const biodataSiswaDetailSubmitSchema = biodataSiswaBaseSchema
  .omit({ catatan: true })
  .extend({
    nisn: nisnField, // override: wajib, tidak lagi optional/nullable
  });

export type BiodataSiswaDetailSubmitInput = z.infer<typeof biodataSiswaDetailSubmitSchema>;