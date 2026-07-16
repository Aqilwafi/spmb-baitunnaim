// @/services/form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function getPendaftarIdByFormId(formId: string ) {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('pendaftar_id')
    .eq('id', formId)
    .single();

  // if (error) {
  //   throw new Error(`Gagal mengambil data id form pendaftaran: ${error.message}`);
  // }

  return data;
}