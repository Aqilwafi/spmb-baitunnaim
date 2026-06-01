import { createSupabaseServer } from "@bn/supabase";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, LogoutResponse, BaseResponse } from "@bn/types";
import { handleAuthError } from "./errors";
import { loginSchema, registerSchema } from "@bn/validators";

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {

  const supabase = await createSupabaseServer();

  // Validate the login payload
  const validation = loginSchema.safeParse(payload);
  
  if (!validation.success) {
    return { 
      success: false, 
      message: "Data tidak valid"
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return handleAuthError(error) as LoginResponse;
  }
  if (!data.user || !data.session) {
    return { success: false, message: "Data sesi pengguna tidak ditemukan." } as LoginResponse;
  }

  // 💡 JANGAN LUPA TAMBAHKAN INI DI AKHIR FUNCTION SHARED
  return {
    success: true,
    message: "Login berhasil.",
    data: {
      user: data.user,
      session: data.session
    } 
  };
}

export async function executeSharedRegister(payload: RegisterPayload): Promise<RegisterResponse> {

  const supabase = await createSupabaseServer();

  const validation = registerSchema.safeParse(payload);
  
  if (!validation.success) {
    return { 
      success: false, 
      message: "Data tidak valid"
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: { 
        username: validation.data.username 
      } 
    }
  })

    if (error) {
      return handleAuthError(error) as RegisterResponse;
    }

  return {
    success: true,
    message: "Jika email anda valid, kami akan memberikan link verifikasi ke email tersebut."
  };
}

// Di @bn/auth/src/core.ts
export async function executeSharedLogout(): Promise<LogoutResponse> {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signOut();

  // Selalu kembalikan objek yang memenuhi kontrak LogoutResponse
  if (error) {
    return handleAuthError(error) as LogoutResponse;
  }
    
  return {
    success: true,
    message: "Logout Berhasil."
  };
}