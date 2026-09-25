// features/biodata/keluarga.ts

import { getListKeluarga, type ListKeluarga } from "@/services/biodata/keluarga/list"; 

export interface FormattedListKeluarga extends ListKeluarga {
    formattedRelasi: string;
}

export async function getKeluargaListData(): Promise<FormattedListKeluarga[]> {
    const listKeluarga = await getListKeluarga();

    if (!listKeluarga || listKeluarga.length === 0) {
        return [];
    }

    // Mapping data dan memformat relasi
    return listKeluarga.map((item) => {
        // Gunakan optional chaining (?.) untuk mencegah error jika item.relasi bernilai null/undefined dari database
        const isWali = item.relasi?.toUpperCase() === "WALI";
        
        let formattedRelasi = "";

        if (isWali && item.detailRelasi) {
            formattedRelasi = `${item.relasi}: ${item.detailRelasi}`;
        } else {
            formattedRelasi = item.relasi || "-";
        }

        return {
            ...item,
            formattedRelasi,
        };
    });
}