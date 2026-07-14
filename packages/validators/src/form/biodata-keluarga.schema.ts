import { z } from "zod";
import {
  namaLengkapField,
  nikField,
  phoneField,
  tempatLahirField,
  tanggalLahirField,
  alamatField,
} from "../core/personal-field";
import { familyRelationField, lifeStatusField } from "../core/enum-field";
import {
  pendidikanField,
  pekerjaanField,
  penghasilanField,
} from "../core/background-field";

export const biodataKeluargaFormSchema = z
  .object({
    biodataSiswaId: z.string().uuid(),
    relationType: familyRelationField,
    detailRelationType: z.string().trim().max(50).optional().nullable(),
    namaLengkap: namaLengkapField,
    nik: nikField.optional().nullable(),
    statusHidup: lifeStatusField.default("HIDUP"),
    tempatLahir: tempatLahirField.optional().nullable(),
    tanggalLahir: tanggalLahirField.optional().nullable(),
    pekerjaan: pekerjaanField.optional().nullable(),
    pendidikanTerakhir: pendidikanField.optional().nullable(),
    penghasilan: penghasilanField.optional().nullable(),
    noHp: phoneField.optional().nullable(),
    alamat: alamatField.optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.statusHidup === "HIDUP") {
      const requiredFields = [
        ["nik", data.nik],
        ["tempatLahir", data.tempatLahir],
        ["tanggalLahir", data.tanggalLahir],
        ["pekerjaan", data.pekerjaan],
        ["pendidikanTerakhir", data.pendidikanTerakhir],
        ["noHp", data.noHp],
        ["penghasilan", data.penghasilan],
      ] as const;

      for (const [field, value] of requiredFields) {
        if (value === null || value === undefined || value === "") {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${field} wajib diisi jika status masih hidup`,
          });
        }
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.relationType === "WALI") {
      if (data.statusHidup !== "HIDUP") {
        ctx.addIssue({
          code: "custom",
          path: ["statusHidup"],
          message: "Wali harus berstatus hidup",
        });
      }
      if (!data.detailRelationType) {
        ctx.addIssue({
          code: "custom",
          path: ["detailRelationType"],
          message: "Detail hubungan wajib diisi untuk Wali (mis. Kakek/Paman)",
        });
      }
    }
  });

export type BiodataKeluargaInput = z.infer<typeof biodataKeluargaFormSchema>;