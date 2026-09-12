import { z } from "zod";
import { npsnField } from "../core/academic-field";

export const pendidikanSebelumnyaFormSchema = z.object({
  namaSekolah: z.string().trim().max(150).optional().nullable(),
  npsn: npsnField.optional().nullable(),
  alamatSekolah: z.string().trim().max(500).optional().nullable(),
  tahunLulus: z.coerce
    .number()
    .int()
    .min(1900)
    .max(2100)
    .optional()
    .nullable(),
  nilaiRataRata: z.coerce
    .number()
    .min(0)
    .max(100)
    .optional()
    .nullable(),
  catatan: z.string().trim().max(500).optional().nullable(),
}).refine(
  (data) => {
    const hasSchoolData = 
      Boolean(data.namaSekolah?.trim()) && 
      Boolean(data.npsn) && 
      Boolean(data.alamatSekolah?.trim());
      
    const hasCatatan = Boolean(data.catatan?.trim());

    // Harus mengisi salah satu: Data sekolah lengkap ATAU Catatan (belum pernah sekolah)
    return hasSchoolData || hasCatatan;
  },
  {
    message: "Harap isi Nama Sekolah, NPSN, dan Alamat Sekolah secara lengkap, atau isi Catatan jika belum pernah sekolah.",
    path: ["catatan"], // Menampilkan error di bagian catatan atau global
  }
);

export type PendidikanSebelumnyaInput = z.infer<typeof pendidikanSebelumnyaFormSchema>;