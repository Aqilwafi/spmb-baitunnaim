import { z } from "zod";
import { emailField, registerPasswordField, usernameField } from "../core/auth-field";

export const registerSchema = z
  .object({
    username: usernameField,
    email:emailField,     
    password: registerPasswordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirm_password"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;