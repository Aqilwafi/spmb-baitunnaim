// core/file-upload-field.ts
import { z } from "zod";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const fileUploadField = (label: string) =>
  z
    .instanceof(File, { error: `${label} wajib diunggah` })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024,
      `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB`
    )
    .refine(
      (file) => ALLOWED_MIME_TYPES.includes(file.type),
      "Format file harus JPG, PNG, atau PDF"
    );