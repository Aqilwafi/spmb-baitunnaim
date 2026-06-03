import { createSupabaseServer } from "@bn/supabase";
import { BaseResponse, GetClaimsResponse } from "@bn/types";
import { handleAuthError } from "./errors";

export async function getCurrentSession(): Promise<BaseResponse<any>> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return handleAuthError(error);
  }

  return {
    success: true,
    message: "Sesi berhasil diambil.",
    data: data 
  };
}

export async function getCurrentUser(): Promise<GetUserResponse<any>> {
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
    data: data
  };
}

export async function getCurrentClaims(): Promise<GetClaimsResponse | null> {
  const supabase = await createSupabaseServer();
  
  // Mengambil claims dari server
  const { data, error } = await supabase.auth.getClaims(); 

  // Jika error atau claims kosong, return null
  if (error || !data?.claims) {
    return null;
  }

  // Cast data.claims ke tipe GetClaimsResponse agar TypeScript tenang
  return data.claims as unknown as GetClaimsResponse;
}