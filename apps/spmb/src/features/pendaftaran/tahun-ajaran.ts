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
        tahun_mulai: tahunAjaran.tahun_mulai,
        tahun_selesai: tahunAjaran.tahun_selesai,
    }
}