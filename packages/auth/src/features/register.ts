// packages/auth/src/features/register.ts

import { registerSchema } from '../validators/register.schema';
import { signUpWithPassword } from '../services/register';
import { RegisterPayload, RegisterResponse } from "@bn/types";

export async function executeSharedRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const result = signUpWithPassword(parsed.data.email, parsed.data.password);
  
    if (!result) {
      return {
        success: false,
        message: "Terjadi Kesalahan.",
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
        message: "Silahkan periksa Email anda untuk melakukan aktivasi akun.",
      }  
}