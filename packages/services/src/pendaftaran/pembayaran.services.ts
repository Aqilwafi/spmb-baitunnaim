// packages/services/src/pendaftaran/pembayaran.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { Pembayaran } from "@bn/types";

export async function getPembayaran(): Promise<Pembayaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('pembayaran')
    .select('*')
    .is('deleted_at', null);

  if (error) return [];

  return data;
}

// id = form_pendaftaran.id
export async function getPembayaranByFormId(formId: string): Promise<Pembayaran | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('pembayaran')
    .select('*')
    .is('deleted_at', null)
    .eq('id', formId)
    .single();

  if (error) return null;

  return data;
}

// id = form_pendaftaran.id, satu pembayaran aktif per pendaftaran (upsert)
export async function savePembayaran(
  formId: string,
  buktiPembayaranUrl: string
): Promise<Pembayaran | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('pembayaran')
    .upsert(
      {
        id: formId,
        bukti_pembayaran_url: buktiPembayaranUrl,
        tanggal_transfer: new Date().toISOString(),
        payment_status: 'SUBMITTED',
      },
      { onConflict: 'id' }
    )
    .select('*')
    .single();

  if (error) return null;

  return data;
}

export async function getSignedBuktiPembayaranUrl(
  buktiPembayaranUrl: string
): Promise<string | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.storage
    .from('bukti-pembayaran')
    .createSignedUrl(buktiPembayaranUrl, 60); // URL berlaku selama 60 detik
  if (error) return null;
  return data.signedUrl;
}