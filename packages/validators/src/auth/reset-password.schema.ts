import { z } from "zod";
import { emailField, registerPasswordField } from "../core/auth-field";

export const resetPasswordSchema = z
  .object({
    email: emailField,
    new_password: registerPasswordField,
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Password baru dan Konfirmasi Password tidak cocok",
    path: ["confirm_new_password"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;