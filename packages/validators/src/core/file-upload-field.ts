import { z } from "zod";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

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

// 🔒 Ditambahkan parameter expectedCategory
export const filePathField = (
  label: string = "File path",
  expectedCategory?: string
) =>
  z
    .string({ message: `${label} harus berupa teks` })
    .trim()
    .min(1, `${label} tidak boleh kosong`)
    .refine((val) => !val.includes("\0"), {
      message: `${label} mengandung karakter ilegal`,
    })
    .refine(
      (val) => !/(^\/|\.\.\/|\.\.\\)/.test(val) && !val.includes(".."),
      { message: `${label} memuat akses direktori tidak valid` }
    )
    // 🔒 Pengecekan prefix folder kategori
    .refine(
      (val) => {
        if (!expectedCategory) return true;
        return val.startsWith(`${expectedCategory}/`);
      },
      { message: `${label} tidak sesuai dengan kategori ${expectedCategory}` }
    )
    .transform((val) => {
      return val
        .replace(/\\/g, "/")
        .replace(/\/+/g, "/")
        .replace(/^(\.\/)+/, "");
    });