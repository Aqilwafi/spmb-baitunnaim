import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";

export async function getPembayaranUrl(paths: string[]): Promise<string[]> {
  const supabase = await createSupabaseServer();

  // Jika array path kosong, langsung kembalikan array kosong
  if (!paths || paths.length === 0) return [];

  // Menggunakan createSignedUrls untuk mengambil URL dengan masa berlaku (misal: 60 detik)
  const { data, error } = await supabase.storage
    .from("SPMB")
    .createSignedUrls(paths, 60);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil return menjadi array of string (signedUrl)
  // Pastikan menyaring nilai yang signedUrl-nya tidak null
  return data
    .map((item) => item.signedUrl)
    .filter((url): url is string => Boolean(url));
}