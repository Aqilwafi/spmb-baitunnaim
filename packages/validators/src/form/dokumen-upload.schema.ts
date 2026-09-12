import { z } from "zod";
import { fileUploadField, filePathField } from "../core/file-upload-field";

export const jenisDokumenEnum = z.enum(["ijazah", "kk", "akta"]);
export type JenisDokumen = z.infer<typeof jenisDokumenEnum>;

export const dokumenUploadSchema = z.object({
  jenisDokumen: jenisDokumenEnum,
  file: fileUploadField("File dokumen"),
});
export type DokumenUploadInput = z.infer<typeof dokumenUploadSchema>;

export const dokumenUploadPathSchema = z.object({
  jenisDokumen: jenisDokumenEnum,
  // 🔒 Mengunci prefix wajib: berkas-pendaftaran/
  filePath: filePathField("Path berkas dokumen", "berkas-pendaftaran"),
});
export type DokumenUploadPathInput = z.infer<typeof dokumenUploadPathSchema>;