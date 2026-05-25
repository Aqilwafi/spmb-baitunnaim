import { z } from "zod";
// Aturan Validasi untuk Register Form (Gaya Terbaru)
export const registerSchema = z.object({
    nama_lengkap: z
        .string()
        .min(3, "Nama lengkap minimal harus 3 karakter")
        .max(50, "Nama terlalu panjang"),
    email: z
        .email({ message: "Format alamat email tidak valid" }), /* <--- UBAH DI SINI */
    password: z
        .string()
        .min(8, "Password minimal harus 8 karakter")
        .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf kapital")
        .regex(/[0-9]/, "Password harus mengandung minimal satu angka"),
});
