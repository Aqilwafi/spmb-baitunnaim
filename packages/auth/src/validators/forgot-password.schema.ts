import { z } from "zod";
import { emailField } from "../core/auth-field";

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;