// dokumen-upload.schema.ts
import { z } from "zod";
import { fileUploadField } from "../core/file-upload-field";

export const dokumenUploadSchema = z.object({
  file: fileUploadField("File dokumen"),
});
export type DokumenUploadInput = z.infer<typeof dokumenUploadSchema>;