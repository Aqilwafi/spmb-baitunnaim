// services/pembayaran-upload.ts
import { createSupabaseBrowser } from "@bn/supabase";

export async function uploadBuktiBayarService(params: {
  file: File;
  userId: string;
  formId: string;
}): Promise<string> {
  const supabase = createSupabaseBrowser();
  
  // Ekstensi file
  const ext = params.file.name.split(".").pop() || "jpg";
  const filePath = `bukti-pembayaran/${params.userId}/${params.formId}-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("pembayaran-private")
    .upload(filePath, params.file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Gagal mengunggah berkas: ${error.message}`);
  }

  return data.path; // Return path file di storage
}