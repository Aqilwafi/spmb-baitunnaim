import { loginSchema } from "../validators/login.schema";
import { signInWithPassword } from "../services/login";
import { LoginResponse, LoginPayload } from "@bn/types";
import { formatZodErrors } from "@bn/validators"; // Helper Zod terpisah

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {
  // 1. Validasi Zod
  const parsed = loginSchema.safeParse(payload);
  
  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi form gagal. Silakan periksa kembali input Anda.",
      errors: formatZodErrors(parsed.error), // 👈 Mengisi state.errors per-field untuk UI
      error: { code: "VALIDATION_ERROR" },
      data: { email: (payload.email as string) || "" },
    };
  }

  // 2. Eksekusi Service Auth
  try {
    const { error } = await signInWithPassword(parsed.data.email, parsed.data.password);

    if (error) {
      return {
        success: false,
        message: "Email atau password salah.", // Pesan global di bawah form
        error: { code: error.code ?? "AUTH_ERROR" },
        data: { email: parsed.data.email },
      };
    }

    return { 
      success: true, 
      message: "Login berhasil.",
      data: { email: parsed.data.email },
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Terjadi kesalahan sistem saat login.",
      error: { code: "INTERNAL_SERVER_ERROR" },
      data: { email: parsed.data.email },
    };
  }
}