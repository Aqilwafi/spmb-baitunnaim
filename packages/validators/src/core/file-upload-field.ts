// core/file-upload-field.ts
import { z } from "zod";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

// --- 1. Validasi File Upload (Browser File Object) ---
export const fileUploadField = (label: string) =>
  z
    .instanceof(File, { message: `${label} wajib diunggah` })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024,
      `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB`
    )
    .refine(
      (file) => ALLOWED_MIME_TYPES.includes(file.type),
      "Format file harus JPG, PNG, atau PDF"
    );

// --- 2. Sanitasi & Validasi String File Path ---
export const filePathField = (label: string = "File path") =>
  z
    .string({ message: `${label} harus berupa teks` })
    .trim()
    .min(1, `${label} tidak boleh kosong`)
    // Mencegah Null Byte Injection
    .refine((val) => !val.includes("\0"), {
      message: `${label} mengandung karakter ilegal`,
    })
    // Mencegah Path Traversal (../ atau ..\)
    .refine(
      (val) => !/(^\/|\.\.\/|\.\.\\)/.test(val) && !val.includes(".."),
      { message: `${label} memuat akses direktori tidak valid` }
    )
    // Sanitasi: Menghapus karakter berbahaya dan merapikan slash
    .transform((val) => {
      return val
        .replace(/\\/g, "/") // Mengubah backslash Windows ke forward slash
        .replace(/\/+/g, "/") // Menghapus double slash berlebih (// -> /)
        .replace(/^(\.\/)+/, ""); // Menghapus prefix ./
    });