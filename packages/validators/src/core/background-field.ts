import { z } from "zod";
import { masterIdField } from "./master-id-field";

export const anakKeField = z.coerce
  .number({ error: "Kolom anak ke- harus diisi dengan angka" })
  .int("Input harus berupa angka bulat")
  .min(1, "Anak ke- tidak boleh kurang dari 1")
  .max(100, "Input angka anak ke- terlalu besar");

export const jumlahSaudaraField = z.coerce
  .number({ error: "Kolom jumlah saudara harus diisi dengan angka" })
  .int("Input harus berupa angka bulat")
  .min(0, "Jumlah saudara tidak boleh minus (isi 0 jika anak tunggal)")
  .max(100, "Input jumlah saudara terlalu besar");

export const hobiField = z
  .string()
  .trim()
  .max(100, "Nama hobi terlalu panjang")
  .regex(/^[a-zA-Z0-9\s.,-]+$/, "Hobi hanya boleh berisi karakter normal");

export const citaCitaField = z
  .string()
  .trim()
  .max(100, "Cita-cita terlalu panjang")
  .regex(/^[a-zA-Z0-9\s.,-]+$/, "Cita-cita hanya boleh berisi huruf");

export const penyakitField = z
  .string()
  .trim()
  .max(255, "Penyakit terlalu panjang")
  .regex(/^[a-zA-Z\s]*$/, "Penyakit hanya boleh berisi huruf dan spasi")
  .optional()
  .nullable()
  .transform((val) => (val === "" ? null : val)); // <--- Mengubah "" menjadi null

export const pendidikanField = z
  .string()
  .max(50, "Maksimal 50 karakter")
  .nullable()
  .optional();

export const pekerjaanField = z
  .string()
  .max(50, "Maksimal 50 karakter")
  .nullable()
  .optional();

export const penghasilanField = z
  .string()
  .max(50, "Maksimal 50 karakter")
  .nullable()
  .optional();

export const statusRumahIdField = masterIdField("Status rumah");
export const tinggalBersamaIdField = masterIdField("Tinggal bersama");