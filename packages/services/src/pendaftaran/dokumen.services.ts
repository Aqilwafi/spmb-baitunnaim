// packages/services/src/pendaftaran/dokumen.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { Dokumen } from "@bn/types";

export async function getDokumen(): Promise<Dokumen[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('dokumen')
    .select('*')
    .is('deleted_at', null);

  if (error) return [];

  return data;
}

export async function getDokumenByFormId(formId: string): Promise<Dokumen[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('dokumen')
    .select('*')
    .is('deleted_at', null)
    .eq('form_pendaftaran_id', formId);

  if (error) return [];

  return data;
}

export async function getDokumenByFormIdAndTipeDokumenId(formId: string, tipeDokumenId: number): Promise<Dokumen | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('dokumen')
    .select('*')
    .is('deleted_at', null)
    .eq('form_pendaftaran_id', formId)
    .eq('tipe_dokumen_id', tipeDokumenId)
    .single();

  if (error) return null;

  return data;
}
