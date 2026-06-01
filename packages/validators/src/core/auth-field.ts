// packages/validators/src/core/auth-field.ts
import { z } from "zod";

// --- FIELD GENERAL / LOGIN (Aturan Dasar) ---
export const emailField = z
  .string()
  .min(1, "Email wajib diisi")
  .trim()
  .toLowerCase()
  .email("Format email tidak valid");

export const loginPasswordField = z
  .string()
  .min(1, "Password wajib diisi"); // Untuk login, tidak kosong saja sudah cukup

// --- FIELD KHUSUS REGISTER (Aturan Ketat) ---
export const registerPasswordField = loginPasswordField
  .min(8, "Password minimal harus 8 karakter")
  .max(72, "Password terlalu panjang, maksimal 72 karakter")
  .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf kapital")
  .regex(/[0-9]/, "Password harus mengandung minimal satu angka");

export const usernameField = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Username minimal harus 3 karakter")
  .max(25, "Username terlalu panjang")
  .or(z.literal(""));