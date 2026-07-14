import { createSupabaseServer } from "@bn/supabase";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  LogoutResponse,
} from "@bn/types";
import { loginSchema, registerSchema } from "@bn/validators";
import { emailField } from "../../validators/src/core/auth-field";

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

export async function executeSharedRegister(
  payload: RegisterPayload
): Promise<RegisterResponse> {

  const validation = registerSchema.safeParse(payload);

  if (!validation.success) {
    const fieldErrors =
      validation.error.flatten(
        (issue) => issue.message
      ).fieldErrors;

    const displayMessage =
      Object.values(fieldErrors).flat()[0]
      || "Data tidak valid";

    return {
      success: false,
      message: displayMessage,
      error: {
        code: "VALIDATION_ERROR",
      },
    };
  }

  const supabase = await createSupabaseServer();

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        username: validation.data.username,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: "Terjadi kesalahan saat registrasi.",
      error: {
        code: "REGISTER_ERROR",
        details: payload.email
      },
    };
  }

  return {
    success: true,
    message:
      "Jika email anda valid, kami akan memberikan link verifikasi ke email tersebut.",
    data: {
      email: validation.data.email,
    },
  };
}

export async function executeSharedLogout(): Promise<LogoutResponse> {

  const supabase = await createSupabaseServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: "Terjadi kesalahan saat logout.",
      error: {
        code: "LOGOUT_ERROR",
      },
    };
  }

  return {
    success: true,
    message: "Logout berhasil.",
  };
}