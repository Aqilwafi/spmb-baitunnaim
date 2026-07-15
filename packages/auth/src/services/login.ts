import { createSupabaseServer } from "@bn/supabase";
import { loginSchema } from "@bn/validators";
import {
  LoginPayload,
  LoginResponse,
} from "@bn/types";


export async function executeSharedLogin(
  payload: LoginPayload
): Promise<LoginResponse> {

  const validation = loginSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Data tidak valid",
      error: {
        code: "VALIDATION_ERROR",
      },
    };
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return {
      success: false,
      message:
        error.status === 401
          ? "Email atau password salah."
          : "Terjadi kesalahan autentikasi.",
      error: {
        code:
          error.status === 401
            ? "UNAUTHORIZED"
            : "AUTH_ERROR",
      },
    };
  }

  if (!data.user || !data.session) {
    return {
      success: false,
      message: "Data sesi pengguna tidak ditemukan.",
      error: {
        code: "SESSION_ERROR",
      },
    };
  }

  return {
    success: true,
    message: "Login berhasil.",
  };
}