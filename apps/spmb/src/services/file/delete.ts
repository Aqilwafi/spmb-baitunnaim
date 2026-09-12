// packages/features/src/upload/storage.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";

export async function deleteFileFromStorageService(filePath: string, bucket: string = "SPMB"): Promise<void> {

  if (!filePath || !filePath.trim()) return;

  const supabase = await createSupabaseServer();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error(
      `[Storage Cleanup Failed] Gagal menghapus file ${filePath}:`,
      error.message
    );
  }
}