// pembayaran-upload.schema.ts
import { z } from "zod";
import { fileUploadField } from "../core/file-upload-field";

export const pembayaranUploadSchema = z.object({
  file: fileUploadField("File bukti pembayaran"),
});
export type PembayaranUploadInput = z.infer<typeof pembayaranUploadSchema>;