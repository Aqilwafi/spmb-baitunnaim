// packages/auth/src/services/check-admin-role.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function isAdminEmail(email: string): Promise<boolean> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc('fn_is_admin_email', {
    check_email: email,
  });

  if (error) {
    console.error("isAdminEmail RPC Error:", error.message);
    // Fail-safe: kalau RPC error, anggap admin (block), 
    // lebih aman drop 1 legit request daripada ke-bypass proteksi
    return true;
  }

  return data ?? false;
}