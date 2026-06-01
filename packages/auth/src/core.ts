import { createSupabaseServer } from "@bn/supabase";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, LogoutResponse } from "@bn/types";
import { handleAuthError } from "./errors";
import { loginSchema, registerSchema } from "@bn/validators";

export async function executeSharedLogin(payload: LoginPayload): Promise<LoginResponse> {

  const supabase = await createSupabaseServer();

  // Validate the login payload
  const validation = loginSchema.safeParse(payload);
  console.log("Login validation result:", validation);
  
  if (!validation.success) {
    return { 
      success: false, 
      message: "Data tidak valid",
      data: {
        email: payload.email
      }
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });
  console.log("Supabase signInWithPassword result:", { data, error });

  if (error) {
    return handleAuthError(error, { email: validation.data.email });
  }
  if (!data.user || !data.session) {
    return { success: false, message: "Data sesi pengguna tidak ditemukan.", data: { email: validation.data.email } };
  }

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

  console.log("Register validation result:", validation);
  
  if (!validation.success) {
   const fieldErrors = validation.error.flatten((issue) => issue.message).fieldErrors;
   const allErrors = Object.values(fieldErrors).flat();
   const displayMessage = allErrors[0] || "Data tidak valid";

    return { 
      success: false, 
      message: displayMessage, // ✨ Sekarang isinya seperti "Password minimal harus 8 karakter", dll.
      data: {
        email: payload.email,
        username: payload.username
      }
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

  console.log("Supabase signUp result:", { data, error });

    if (error) {
      return handleAuthError(error, { email: validation.data.email, username: validation.data.username });
    }

  return {
    success: true,
    message: "Jika email anda valid, kami akan memberikan link verifikasi ke email tersebut."
  };
}

export async function executeSharedLogout(): Promise<LogoutResponse> {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signOut();

  // Selalu kembalikan objek yang memenuhi kontrak LogoutResponse
  if (error) {
    return handleAuthError(error);
  }
    
  return {
    success: true,
    message: "Logout Berhasil."
  };
}