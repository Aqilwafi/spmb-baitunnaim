// packages/auth/src/features/core.ts

import { loginSchema } from "../validators/login.schema";
import { signInWithPassword } from "../services/login";
import { LoginResponse, LoginPayload } from "@bn/types";

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await signInWithPassword(parsed.data.email, parsed.data.password);

  if (error) {
    return {
      success: false,
      message: "",
      error:{
        code: ""
      },
      data: {
        email: payload.email 
      }
    }
  }

  return {
      success: true,
      message: "",
    }
}