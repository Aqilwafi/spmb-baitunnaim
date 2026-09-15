// apps/spmb/src/services/pendaftara/data/finalisasi

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { FinalisasiResult } from '@/types/form.types';

export async function getFinalisasi(formId: string, tahunAjaranId: number): Promise<FinalisasiResult> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.
    from('form_pendaftaran')
    .select('*')
    .eq('id', formId)
    .eq('tahun_ajaran_id', tahunAjaranId)
    .is('deleted_at', null)
    .limit(1)
    .single();

  if (error) throw error;

  return {
    formId: data.id,
    admissionStatus: data.admission_status,
    finalizedAt: data.finalized_at,
    finalizedBy: data.finalized_by
  };
}

export async function getIsFinalForm(formId: string, tahunAjaranId: number): Promise<boolean> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
      .from('form_pendaftaran')
      .select('id')
      .eq('id', formId)
      .eq('tahun_ajaran_id', tahunAjaranId)
      .neq('registration_status', 'DRAFT') // Lebih aman untuk nilai tunggal
      .not('finalized_at', 'is', null)
      .not('finalized_by', 'is', null)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) throw error;

    // Mengubah hasil (object / null) menjadi boolean true / false
    return !!data;
}