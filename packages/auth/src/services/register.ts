import { createSupabaseServer } from "@bn/supabase";
import { registerSchema } from "@bn/validators";
import {
  RegisterPayload,
  RegisterResponse,
} from "@bn/types";

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