import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { Pembayaran } from "@bn/types";

export async function getPembayaran(): Promise<Pembayaran[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("pembayaran")
    .select("*")
    .is("deleted_at", null);

  if (error) return [];

  return data;
}

// id = form_pendaftaran.id
export async function getPembayaranByFormId(formId: string): Promise<Pembayaran | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("pembayaran")
    .select("*")
    .is("deleted_at", null)
    .eq("id", formId)
    .maybeSingle(); // Menggunakan maybeSingle agar tidak throw error jika data belum ada

  if (error) return null;

  return data;
}

/**
 * Menyimpan / memperbarui bukti pembayaran aktif per pendaftaran (Upsert)
 * @param formId ID dari form_pendaftaran (sebagai Primary Key / Foreign Key 1:1)
 * @param buktiPembayaranUrl Path file storage bukti pembayaran
 */
export async function savePembayaran(
  formId: string,
  buktiPembayaranUrl: string
): Promise<Pembayaran | null> {
  const supabase = await createSupabaseServer();
  
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("pembayaran")
    .upsert(
      {
        id: formId,
        bukti_pembayaran_url: buktiPembayaranUrl,
        tanggal_transfer: now,
        payment_status: "SUBMITTED",
        updated_at: now,
      },
      { 
        onConflict: "id",
        ignoreDuplicates: false // Memastikan record di-update jika id sudah ada
      }
    )
    .select("*")
    .single();

  if (error) {
    console.error("[savePembayaran Error]:", error.message);
    return null;
  }

  return data;
}

export async function getSignedBuktiPembayaranUrl(
  buktiPembayaranUrl: string
): Promise<string | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.storage
    .from("bukti-pembayaran")
    .createSignedUrl(buktiPembayaranUrl, 60); // URL berlaku selama 60 detik

  if (error) return null;
  return data.signedUrl;
}

export async function createBuktiPembayaranSignedUrl(filePath: string) {
  const supabase = await createSupabaseServer();
  const { data, error: storageError } = await supabase.storage
    .from("SPMB")
    .createSignedUploadUrl(filePath);

  if (storageError) {
    return { error: storageError.message, status: 500 };
  }

  return {
    data: {
      signedUrl: data.signedUrl,
      path: data.path,
    },
    status: 200,
  };
}