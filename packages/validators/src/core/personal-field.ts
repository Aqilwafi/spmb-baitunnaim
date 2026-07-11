import { z } from "zod";
import {
  genderField,
  familyRelationField,
  agamaField,
  lifeStatusField,
} from "./enum-field";

export { genderField, familyRelationField, agamaField, lifeStatusField };

export const nikField = z
  .string()
  .trim()
  .regex(/^\d{16}$/, "NIK harus berupa 16 digit angka");

export const noKkField = z
  .string()
  .trim()
  .regex(/^\d{16}$/, "No KK harus berupa 16 digit angka");

export const phoneField = z
  .string()
  .trim()
  .regex(
    /^(08|\+628|628)[0-9]{9,13}$/,
    "Nomor HP harus format Indonesia (contoh: 08xx, +628xx, atau 628xx)"
  );

export const namaLengkapField = z
  .string()
  .trim()
  .min(1, "Nama minimal harus 1 karakter")
  .max(100, "Nama terlalu panjang");

export const tempatLahirField = z
  .string()
  .trim()
  .min(2, "Tempat lahir minimal harus 2 karakter")
  .max(100, "Tempat lahir terlalu panjang")
  .regex(/^[a-zA-Z0-9\s.,()-]+$/, "Tempat lahir hanya boleh berisi huruf dan tanda baca standar");

export const tanggalLahirField = z.coerce
  .date({ error: "Tanggal lahir wajib diisi dengan format yang benar" })
  .refine((date) => {
    const usiaMinimal = new Date();
    usiaMinimal.setFullYear(usiaMinimal.getFullYear() - 1);
    return date <= usiaMinimal;
  }, "Usia minimal pendaftar adalah 1 tahun")
  .refine((date) => {
    const batasMasaLalu = new Date();
    batasMasaLalu.setFullYear(batasMasaLalu.getFullYear() - 100);
    return date >= batasMasaLalu;
  }, "Tahun lahir tidak masuk akal");

export const alamatField = z
  .string()
  .trim()
  .min(10, "Alamat lengkap minimal harus 10 karakter agar jelas")
  .max(500, "Alamat terlalu panjang (maksimal 500 karakter)")
  .regex(
    /^[a-zA-Z0-9\s.,/()#:-]+$/,
    "Alamat hanya boleh berisi huruf, angka, spasi, dan tanda baca standar (., / () # : -)"
  );