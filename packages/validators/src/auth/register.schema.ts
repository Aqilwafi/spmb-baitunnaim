import { z } from "zod";
import { emailField, passwordField, usernameField } from "../core/auth-field";

export const registerSchema = z
  .object({
    username: usernameField,
    email:emailField,     
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;