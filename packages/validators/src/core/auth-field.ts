// packages/validators/src/core/auth-field.ts
import { z } from "zod";

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Format email tidak valid" }));

export const passwordField = z
  .string()
  .min(8, "Password minimal harus 8 karakter")
  .max(72, "Password terlalu panjang, maksimal 72 karakter")
  .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf kapital")
  .regex(/[0-9]/, "Password harus mengandung minimal satu angka");

export const usernameField = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Username minimal harus 3 karakter")
  .max(50, "Username terlalu panjang");