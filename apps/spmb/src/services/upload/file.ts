// features/upload/file.ts
import { createSupabaseBrowser } from "@bn/supabase/browser";

interface DirectUploadParams {
  bucket: string;
  path: string;
  token: string;
  file: File;
}

/**
 * Helper murni untuk upload file langsung dari Browser ke Supabase Storage via Signed URL.
 * Reusable di seluruh fitur/step yang membutuhkan upload file.
 */
export async function uploadFileToSignedUrl({
  bucket,
  path,
  token,
  file,
}: DirectUploadParams) {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(path, token, file);

  if (error) {
    throw new Error(`Upload storage gagal: ${error.message}`);
  }

  return data;
}