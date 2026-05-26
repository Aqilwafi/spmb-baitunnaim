import { z } from "zod";

export const nisnField = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "NISN harus berupa 10 digit angka");

export const npsnField = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "NPSN harus berupa 10 digit angka");

export const lembagaField = z.enum(["MI", "TK", "PAUD", "TPA"], {
  error: "Lembaga Tujuan harus dipilih (MI, TK, PAUD, atau TPA)",
});

export const kelasField = z.enum(["1", "2", "3", "4", "5", "6"], {
  error: "Kelas harus dipilih (1, 2, 3, 4, 5, atau 6)",
});

export const pendidikanSebelumnyaField = z
  .string()
  .trim()
  .min(3, "Nama pendidikan sebelumnya minimal harus 3 karakter")
  .max(150, "Nama pendidikan sebelumnya terlalu panjang (maksimal 150 karakter)")
  // 💡 Mengizinkan huruf, angka, spasi, dan tanda baca standar sekolah seperti strip atau petik tunggal
  .regex(
    /^[a-zA-Z0-9\s.,'()-]+$/, 
    "Nama sekolah hanya boleh berisi huruf, angka, dan tanda baca standar"
  );