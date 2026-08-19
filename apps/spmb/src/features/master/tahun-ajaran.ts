// services/pendaftaran/tahun-ajaran.services.ts

import { MasterTahunAjaran } from "@bn/types";
import { getMasterTahunAjaran } from "@bn/services";

export async function getTahunAjaranAktif (): Promise<MasterTahunAjaran | null> {

    const tahunAjaran = await getMasterTahunAjaran();
    

    if (!tahunAjaran) return null;

    return {
        id: tahunAjaran.id,
        code: tahunAjaran.code,
        semester: tahunAjaran.semester,
        start_year: tahunAjaran.start_year,
        end_year: tahunAjaran.end_year,
        label:tahunAjaran.label,
        is_active: tahunAjaran.is_active,
        updated_at: tahunAjaran.updated_at,
        created_at: tahunAjaran.created_at
    }
}