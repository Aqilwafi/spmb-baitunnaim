import { z } from "zod";

export const anakKeField = z
  .coerce // 💡 Mengubah string string "3" dari form HTML menjadi angka 3 otomatis
  .number({ error: "Kolom anak ke- harus diisi dengan angka" })
  .int("Input harus berupa angka bulat")
  .min(1, "Anak ke- tidak boleh kurang dari 1")
  .max(100, "Input angka anak ke- terlalu besar");

// 2. Jumlah Saudara (INTEGER di Database)
export const jumlahSaudaraField = z
  .coerce
  .number({ error: "Kolom jumlah saudara harus diisi dengan angka" })
  .int("Input harus berupa angka bulat")
  .min(0, "Jumlah saudara tidak boleh minus (isi 0 jika anak tunggal)")
  .max(100, "Input jumlah saudara terlalu besar");

// Tambahkan di src/core/background-fields.ts
export const hobiField = z
  .string()
  .trim()
  .max(50, "Nama hobi terlalu panjang")
  .regex(/^[a-zA-Z0-9\s-]+$/, "Hobi hanya boleh berisi karakter normal")
  .optional() // Biasanya hobi bersifat opsional (boleh kosong)
  .nullable();

export const citaCitaField = z
  .string()
  .trim()
  .max(100, "Cita-cita terlalu panjang")
  .regex(/^[a-zA-Z0-9\s-]+$/, "Hobi hanya boleh berisi huruf")
  .optional() // Biasanya hobi bersifat opsional (boleh kosong)
  .nullable();

export const penyakitField = z
  .string()
  .trim()
  .max(255, "Penyakit terlalu panjang")
  .regex(/^[a-zA-Z0-9\s-]+$/, "Hobi hanya boleh berisi huruf")
  .optional() // Biasanya hobi bersifat opsional (boleh kosong)
  .nullable();

// 1. Bidang Pendidikan Terakhir (Contoh menggunakan kode jenjang standar)
export const pendidikanField = z.enum(
  ["TIDAK_SEKOLAH", "SD", "SMP", "SMA", "D3", "D4", "S1", "S2", "S3"], 
  { error: "Pendidikan terakhir wajib dipilih" }
);

// 2. Bidang Pekerjaan (Contoh menggunakan kode kategori pekerjaan)
export const pekerjaanField = z.enum(
  ["TIDAK_BEKERJA", "PNS", "TNI_POLRI", "SWASTA", "WIRASWASTA", "BURUH", "NELAYAN", "PETANI", "PENSIUNAN", "LAINNYA"],
  { error: "Pekerjaan wajib dipilih" }
);

// 3. Bidang Penghasilan Bulanan (Contoh menggunakan kode rentang/bracket gaji)
// Sangat direkomendasikan pakai kode bracket (misal: Kurang dari 1jt, 1jt-2jt, dst)
export const penghasilanField = z.enum(
  ["NO_INCOME", "UNDER_1M", "1M_2M", "2M_5M", "5M_10M", "OVER_10M"],
  { error: "Rentang penghasilan wajib dipilih" }
);

export const statusRumahField = z.enum(
  ["NO_INCOME", "UNDER_1M", "1M_2M", "2M_5M", "5M_10M", "OVER_10M"],
  { error: "Status rumah wajib dipilih" }
);

export const tinggalBersamaField = z.enum(
  ["NO_INCOME", "UNDER_1M", "1M_2M", "2M_5M", "5M_10M", "OVER_10M"],
  { error: "Tinggal bersama wajib dipilih" }
);