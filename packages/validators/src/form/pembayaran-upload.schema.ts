// packages/validators/src/pembayaran-upload.schema.ts
import { z } from "zod";
import { fileUploadField, filePathField } from "../core/file-upload-field";

// 1. Skema untuk Form di Client (jika fileUploadField cek instance File)
export const pembayaranUploadSchema = z.object({
  file: fileUploadField("File bukti pembayaran"),
});
export type PembayaranUploadInput = z.infer<typeof pembayaranUploadSchema>;

// 2. Skema untuk Form Client saat Edit / Submit via String Path (file yang sudah diunggah)
export const pembayaranUploadPathSchema = z.object({
  filePath: filePathField("Bukti pembayaran"),
});
export type PembayaranUploadPathInput = z.infer<typeof pembayaranUploadPathSchema>;

// 3. Skema Hybrid Form (bisa berupa File baru ATAU String Path file lama)
export const pembayaranUploadFlexibleSchema = z.object({
  buktiPembayaran: z.union([
    fileUploadField("Bukti pembayaran"),
    filePathField("Bukti pembayaran"),
  ]),
});
export type PembayaranUploadFlexibleInput = z.infer<typeof pembayaranUploadFlexibleSchema>;

// 4. Skema untuk Request Signed URL di API Route (Metadata JSON)
export const requestUploadMetadataSchema = z.object({
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
});
export type RequestUploadMetadataInput = z.infer<typeof requestUploadMetadataSchema>;