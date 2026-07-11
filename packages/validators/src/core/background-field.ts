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
  .regex(/^[a-zA-Z0-9\s.,-]+$/, "Penyakit hanya boleh berisi huruf")
  .optional()
  .nullable();

export const pendidikanField = z.enum(
  ["TIDAK_SEKOLAH", "SD", "SMP", "SMA", "D3", "D4", "S1", "S2", "S3"],
  { error: "Pendidikan terakhir wajib dipilih" }
);

export const pekerjaanField = z.enum(
  ["TIDAK_BEKERJA", "PNS", "TNI_POLRI", "SWASTA", "WIRASWASTA", "BURUH", "NELAYAN", "PETANI", "PENSIUNAN", "LAINNYA"],
  { error: "Pekerjaan wajib dipilih" }
);

export const penghasilanField = z.enum(
  ["NO_INCOME", "UNDER_1M", "1M_2M", "2M_5M", "5M_10M", "OVER_10M"],
  { error: "Rentang penghasilan wajib dipilih" }
);

export const statusRumahIdField = masterIdField("Status rumah");
export const tinggalBersamaIdField = masterIdField("Tinggal bersama");