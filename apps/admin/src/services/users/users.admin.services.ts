// @/services/users/users.admin.services.ts
// KHUSUS untuk operasi yang butuh service role — file terpisah biar jelas boundary-nya

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin"; // instance service role, bukan inject dari caller

export async function listAuthUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(`Gagal mengambil data auth users: ${error.message}`);
  }

  return data.users;
}