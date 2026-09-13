// access-url.ts

import 'server-only';
import { createSupabaseServer } from "@bn/supabase/server";

export async function getSignedUrl (filePath: string): Promise<string | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.storage
    .from("SPMB")
    .createSignedUrl(filePath, 60);

  if (error) return null;
  return data.signedUrl;
}