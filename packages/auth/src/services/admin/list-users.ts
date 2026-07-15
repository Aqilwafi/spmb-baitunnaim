// packages/auth/src/services/admin/list-users.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";

export async function inviteUserByEmail() {
  const supabase = supabaseAdmin;
  return supabase.auth.admin.listUsers();
}