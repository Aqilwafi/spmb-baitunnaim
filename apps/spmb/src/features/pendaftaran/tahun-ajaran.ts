// services/pendaftaran/tahun-ajaran.services.ts

import "server-only";
import { MasterTahunAjaranListItem } from "@bn/types";
import { getMasterTahunAjaran } from "@bn/services";
import { AppSupabaseClient } from "@bn/supabase";

export async function getTahunAjaranAktif (supabase: AppSupabaseClient): Promise<MasterTahunAjaranListItem | null> {

    const tahunAjaran = await getMasterTahunAjaran(supabase);

    if (!tahunAjaran) return null;

    return {
        code: tahunAjaran.code,
        semester: tahunAjaran.semester,
        start_year: tahunAjaran.start_year,
        end_year: tahunAjaran.end_year,
    }
}