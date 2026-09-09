import { registerSchema } from '../validators/register.schema';
import { signUpWithPassword } from '../services/register';
import { RegisterPayload, RegisterResponse } from "@bn/types";
import { formatZodErrors } from "@bn/validators";

export async function executeSharedRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  // 1. Validasi Zod (Jangan throw Error, kembalikan fieldErrors)
  const parsed = registerSchema.safeParse(payload);
  
  if (!parsed.success) {
    return {
      success: parsed.success,
      message: "Validasi form gagal. Silakan periksa kembali input Anda.",
      errors: formatZodErrors(parsed.error),
      error: {
        code: "VALIDATION_ERROR",
      },
      data: {
        email: payload.email || "",
      },
    };
  }
  // 2. Eksekusi Service (Gunakan `await` karena ini operasi Async)
  try {
    const result = await signUpWithPassword(parsed.data.email, parsed.data.password);

    if (!result || result.error) {
      return {
        success: false,
        message: result?.error?.message || "Terjadi kesalahan saat mendaftar.",
        error: {
          code: result?.error?.code || "SIGNUP_FAILED",
        },
        data: {
          email: parsed.data.email,
        },
      };
    }

    return {
      success: true,
      message: "Silakan periksa email Anda untuk melakukan aktivasi akun.",
      data: {
        email: parsed.data.email,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Terjadi kesalahan server.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
      data: {
        email: parsed.data.email,
      },
    };
  }
}