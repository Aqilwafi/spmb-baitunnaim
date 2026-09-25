// packages/auth/src/services/admin/invite.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";
import type { BaseAuthResponse } from "@bn/types";

export async function deleteUser(userId: string): Promise<BaseAuthResponse> {
  const supabase = supabaseAdmin;
  
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return {
      success: false,
      code: error.code,
      credential: userId
    };
  }

  return {
    success: true,
    id: data.user.id,
    credential: data.user.email ?? userId,
  };
}