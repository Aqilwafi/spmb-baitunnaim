// packages/auth/src/services/admin/invite.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";

export async function inviteUserByEmail(email: string, url: string) {
  const supabase = supabaseAdmin;
  return supabase.auth.admin.inviteUserByEmail(email, {redirectTo: url});
}