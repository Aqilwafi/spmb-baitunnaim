import { createSupabaseServer } from "@bn/supabase";
import { BaseResponse } from "@bn/types";
import { handleAuthError } from "./errors";

export async function getCurrentSession(): Promise<BaseResponse<any>> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return handleAuthError(error); // ✨ Wajib pakai RETURN agar fungsi berhenti di sini jika error
  }

  return {
    success: true,
    message: "Sesi berhasil diambil.",
    data: data.session // 👈 ✨ Kembalikan objek session-nya!
  };
}

export async function getCurrentUser(): Promise<BaseResponse<any>> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return handleAuthError(error); // ✨ Wajib pakai RETURN
  }

  // Proteksi jika user kosong tanpa memicu objek error
  if (!data.user) {
    return {
      success: false,
      message: "Pengguna tidak terautentikasi atau sesi telah habis."
    };
  }

  return {
    success: true,
    message: "Data pengguna berhasil diambil.",
    data: data.user // 👈 ✨ Kembalikan objek user-nya!
  };
}

export async function getCurrentClaims(): Promise<BaseResponse<any>> {
  const supabase = await createSupabaseServer();
  
  // Jika SDK Supabase versimu tidak punya .getClaims(), 
  // biasanya kita membaca dari getUser() lalu mengambil app_metadata / user_metadata.
  const { data, error } = await supabase.auth.getClaims(); 

  if (error) {
    return handleAuthError(error); // ✨ Wajib pakai RETURN
  }

  return {
    success: true,
    message: "Claims pengguna berhasil diambil.",
    data: data // 👈 ✨ Kembalikan datanya!
  };
}