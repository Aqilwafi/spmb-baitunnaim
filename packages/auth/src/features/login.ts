// packages/auth/src/features/core.ts

import { loginSchema } from "../validators/login.schema";
import { signInWithPassword } from "../services/login";
import { LoginResponse, LoginPayload } from "@bn/types";

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
      error: { code: "VALIDATION_ERROR" },
      data: { email: payload.email as string },
    };
  }

  const { error } = await signInWithPassword(parsed.data.email, parsed.data.password);

  if (error) {
    return {
      success: false,
      message: "Email atau password salah.", // sebaiknya diisi, bukan string kosong
      error: { code: error.code ?? "AUTH_ERROR" },
      data: { email: payload.email as string },
    };
  }

  return { success: true, message: "" };
}