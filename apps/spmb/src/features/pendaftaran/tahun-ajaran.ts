// services/pendaftaran/tahun-ajaran.services.ts

import "server-only";
import { MasterTahunAjaranListItem } from "@bn/types";
import { getMasterTahunAjaran } from "@bn/services";

export async function getTahunAjaranAktif (): Promise<MasterTahunAjaranListItem | null> {

    const tahunAjaran = await getMasterTahunAjaran();

    if (!tahunAjaran) return null;

    return {
        id: tahunAjaran.id,
        code: tahunAjaran.code,
        semester: tahunAjaran.semester,
        start_year: tahunAjaran.start_year,
        end_year: tahunAjaran.end_year,
    }
}