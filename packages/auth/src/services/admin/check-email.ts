// packages/auth/src/services/check-admin-role.ts
import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";

export async function isAdminEmail(email: string): Promise<boolean> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase.rpc('fn_check_email_is_admin', {
    p_email: email,
  });

  if (error) {
    console.error("isAdminEmail RPC Error:", error.message);
    return true;
  }

  return data ?? false;
}