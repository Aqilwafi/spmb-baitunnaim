// features/pendaftaran/tahun-ajaran.services.ts

import { MasterData } from "@bn/types";
import { getMasterTahunAjaran } from "@bn/services";
import { mapTahunAjaranAktif } from "@bn/utils";

export async function getTahunAjaranAktifData(): Promise<MasterData> {
    const rawData = await getMasterTahunAjaran();
    
    if (!rawData) {
        throw new Error("Tahun ajaran aktif tidak ditemukan di sistem.");
    }

    return mapTahunAjaranAktif(rawData);
}