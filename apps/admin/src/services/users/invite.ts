// packages/auth/src/services/admin/invite.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";
import type { BaseAuthResponse } from "@bn/types";

export async function inviteUserByEmail(email: string, role_id: number, url: string, username: string | null): Promise<BaseAuthResponse> {
  const supabase = supabaseAdmin;
  
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: url,
    data: {
      role_id: role_id,
      username: username,
    },
  });

  if (error) {
    return {
      success: false,
      code: error.code,
      credential: email
    };
  }

  return {
    success: true,
    id: data.user.id,
    credential: data.user.email ?? email
  };
}