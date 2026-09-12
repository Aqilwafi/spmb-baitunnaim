import { z } from "zod";

export const uploadCategoryEnum = z.enum(["bukti-pembayaran", "berkas-pendaftaran"]);
export type UploadCategory = z.infer<typeof uploadCategoryEnum>;

export const requestUploadMetadataSchema = z
  .object({
    fileName: z
      .string()
      .min(1, "Nama file wajib ada")
      .transform((name) => name.replace(/[^a-zA-Z0-9.-]/g, "_")),
    fileType: z.enum(
      ["image/jpeg", "image/png", "image/webp", "application/pdf"],
      { message: "Tipe file tidak diizinkan" }
    ),
    fileSize: z
      .number()
      .positive()
      .max(5 * 1024 * 1024, "Ukuran file maksimal 5MB"),
    category: uploadCategoryEnum,
    documentType: z.enum(["ijazah", "kk", "akta"]).optional(),
  })
  // 🔒 Menjamin documentType terisi jika kategori berkas-pendaftaran
  .refine(
    (data) => {
      if (data.category === "berkas-pendaftaran") {
        return !!data.documentType;
      }
      return true;
    },
    {
      message: "Tipe dokumen wajib dipilih untuk kategori berkas pendaftaran",
      path: ["documentType"],
    }
  );

export type RequestUploadMetadataInput = z.infer<typeof requestUploadMetadataSchema>;