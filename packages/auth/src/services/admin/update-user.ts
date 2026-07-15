// packages/auth/src/services/admin/update-user.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";

export async function updateUserById(userid: string, target: any) {
  const supabase = supabaseAdmin;
  return supabase.auth.admin.updateUserById(userid, {ban_duration: target});
}