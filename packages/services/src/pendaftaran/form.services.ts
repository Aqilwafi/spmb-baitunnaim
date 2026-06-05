// @bn/services/src/pendafat/masterService.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import { FormPendaftaran } from "@bn/types";

export async function getFormPendaftaran(supabase: AppSupabaseClient): Promise<FormPendaftaran[]> {

  const { data: formPendaftaran, error } = await supabase
    .from("form_pendaftaran")
    .select("*");

  if (error) {
    throw new Error(
      `Gagal mengambil data master kelas: ${error.message}`
    );
  }

  return formPendaftaran;
}