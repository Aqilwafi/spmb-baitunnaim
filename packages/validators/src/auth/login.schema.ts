import { z } from "zod";
import { emailField, loginPasswordField } from "../core/auth-field";

export const loginSchema = z
  .object({
    email:emailField,     
    password: loginPasswordField
  });

export type LoginInput = z.infer<typeof loginSchema>;