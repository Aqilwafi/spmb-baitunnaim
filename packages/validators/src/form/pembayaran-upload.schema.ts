import { z } from "zod";
import { fileUploadField, filePathField } from "../core/file-upload-field";

export const pembayaranUploadSchema = z.object({
  file: fileUploadField("File bukti pembayaran"),
});
export type PembayaranUploadInput = z.infer<typeof pembayaranUploadSchema>;

export const pembayaranUploadPathSchema = z.object({
  // 🔒 Mengunci prefix wajib: pembayaran/
  filePath: filePathField("Bukti pembayaran", "bukti-pembayaran"),
});
export type PembayaranUploadPathInput = z.infer<typeof pembayaranUploadPathSchema>;

export const pembayaranUploadFlexibleSchema = z.object({
  buktiPembayaran: z.union([
    fileUploadField("Bukti pembayaran"),
    // 🔒 Mengunci prefix wajib jika berupa path: pembayaran/
    filePathField("Bukti pembayaran", "bukti-pembayaran"),
  ]),
});
export type PembayaranUploadFlexibleInput = z.infer<typeof pembayaranUploadFlexibleSchema>;