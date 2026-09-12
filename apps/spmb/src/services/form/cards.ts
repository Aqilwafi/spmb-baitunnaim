// @/services/cards.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { FormCardsData } from "@/types/form.types";

export async function getFormCard(tahunAjaranId: number): Promise<FormCardsData[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.rpc("fn_rpc_get_form_cards", {
    p_tahun_ajaran_id: tahunAjaranId,
  });

  if (error) throw error;

  return data.map((item) => ({
    id: item.id,
    namaLengkap: item.nama_lengkap,
    lembagaLabel: item.lembaga_label,
    kelasLabel: item.kelas_label,
    stepLabel: item.step_label,
    registrationStatus: item.registration_status,
    admissionStatus: item.admission_status,
    updatedAt: item.updated_at,
  }));
}