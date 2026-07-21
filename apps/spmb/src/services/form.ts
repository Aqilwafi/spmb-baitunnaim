// services/form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { FormPendaftaran } from "@bn/types";

export async function getFormDataByOwnerIdAndTahunAjaranId(ownerId: string, tahunAjaranId: number): Promise<FormPendaftaran[]> {

    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
        .from('form_pendaftaran')
        .select('*')
        .is('deleted_at', null)
        .eq('pendaftar_id', ownerId)
        .eq('tahun_ajaran_id', tahunAjaranId);

    if (error) return [];

    return data;
}