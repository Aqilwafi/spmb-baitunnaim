// services/pembayaran-upload.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase/server"; // 👈 Pakai Server Client

export async function deleteBuktiBayarService(filePath: string): Promise<void> {
  // 1. Inisialisasi Server Client
  const supabase = await createSupabaseServer();

  // 2. Eksekusi Remove
  const { data, error } = await supabase.storage
    .from("SPMB")
    .remove([filePath]);

  if (error) {
    console.error(`[Storage Cleanup Failed] Gagal menghapus file ${filePath}:`, error.message);
  } 
}