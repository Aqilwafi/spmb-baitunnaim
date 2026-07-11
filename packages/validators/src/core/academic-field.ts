import { z } from "zod";
import { masterIdField } from "./master-id-field";

export const nisnField = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "NISN harus berupa 10 digit angka");

export const npsnField = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9]{8}$/, "NPSN harus 8 karakter alfanumerik");

export const lembagaIdField = masterIdField("Lembaga tujuan");
export const kelasIdField = masterIdField("Kelas");

export const pendidikanSebelumnyaField = z
  .string()
  .trim()
  .min(3, "Nama pendidikan sebelumnya minimal harus 3 karakter")
  .max(150, "Nama pendidikan sebelumnya terlalu panjang (maksimal 150 karakter)")
  .regex(
    /^[a-zA-Z0-9\s.,'()-]+$/,
    "Nama sekolah hanya boleh berisi huruf, angka, dan tanda baca standar"
  )
  .optional()
  .nullable();