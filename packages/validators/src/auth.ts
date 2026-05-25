import { z } from "zod";

// Aturan Validasi untuk Register Form (Gaya Terbaru)
export const registerSchema = z
  .object({
    nama_lengkap: z
      .string()
      .min(3, "Nama lengkap minimal harus 3 karakter")
      .max(50, "Nama terlalu panjang"),
      
    email: z
      .string() // 💡 Tambahkan .string() sebelum .email() agar tidak error di Zod
      .email({ message: "Format alamat email tidak valid" }),
      
    password: z
      .string()
      .min(8, "Password minimal harus 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf kapital")
      .regex(/[0-9]/, "Password harus mengandung minimal satu angka"),

    // 💡 1. Tambahkan field confirmPassword ke dalam objek skema
    confirmPassword: z.string(),
  })
  // 💡 2. Gunakan .refine() setelah .object() untuk mencocokkan kedua field tersebut
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirmPassword"], // Mengarahkan pesan error tepat ke input confirmPassword
  });

export type RegisterInput = z.infer<typeof registerSchema>;