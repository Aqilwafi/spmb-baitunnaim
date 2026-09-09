import { z } from "zod";
import { emailField, registerPasswordField, usernameField } from "@bn/validators";

export const registerSchema = z
  .object({
    username: usernameField,
    email: emailField,     
    password: registerPasswordField,
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirmPassword"], // ✅ Disesuaikan menjadi camelCase
  });

export type RegisterInput = z.infer<typeof registerSchema>;