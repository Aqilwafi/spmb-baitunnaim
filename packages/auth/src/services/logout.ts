import { createSupabaseServer } from "@bn/supabase";
import { LogoutResponse } from "@bn/types";

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