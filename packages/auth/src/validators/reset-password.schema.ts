import { z } from "zod";
import { registerPasswordField } from "@bn/validators";

export const resetPasswordSchema = z
  .object({
    newPassword: registerPasswordField,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password baru dan konfirmasi password tidak cocok",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;