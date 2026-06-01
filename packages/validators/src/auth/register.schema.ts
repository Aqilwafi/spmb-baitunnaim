import { z } from "zod";
import { emailField, registerPasswordField, usernameField } from "../core/auth-field";

export const registerSchema = z
  .object({
    username: usernameField,
    email:emailField,     
    password: registerPasswordField,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirm_password"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;