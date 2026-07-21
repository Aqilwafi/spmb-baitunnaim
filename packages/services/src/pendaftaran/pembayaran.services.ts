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
