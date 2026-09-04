// @/services/cards.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { FormCardsData } from "@/types/form.types";

export async function formCardsServices(tahunAjaranId: number): Promise<FormCardsData[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.rpc("fn_rpc_get_form_cards", {
    p_tahun_ajaran_id: tahunAjaranId,
  });
  if (error) return [];
  return data;
}