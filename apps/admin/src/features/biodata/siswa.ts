// features

import { getListSiswa, type ListSiswa } from "@/services/biodata/siswa/list";
import { getMasterKelas, getMasterLembaga } from "@bn/services";
import { MasterKelas, MasterLembaga } from "@bn/types";

export interface FormattedListSiswa extends ListSiswa {
    kelas: string; // kelas adalah gabungan LembagaLabel - KelasLabel (jika MI) atau hanya LembagaLabel
    lembagaLabel: MasterLembaga['label'];
    kelasLabel: MasterKelas['label'];
}

export async function getSiswaListData(): Promise<FormattedListSiswa[]> {
    const listSiswa = await getListSiswa();

    if (!listSiswa || listSiswa.length === 0) {
        return [];
    }

    // 1. Kumpulkan semua ID lembaga dan kelas yang unik (tipe number)
    const lembagaIds = Array.from(
        new Set(
            listSiswa
                .map((item) => item.lembagaId)
                .filter((id): id is number => id !== null && id !== undefined)
        )
    );

    const kelasIds = Array.from(
        new Set(
            listSiswa
                .map((item) => item.kelasId)
                .filter((id): id is number => id !== null && id !== undefined)
        )
    );

    // 2. Ambil data master lembaga dan kelas secara paralel
    const [lembagaData, kelasData] = await Promise.all([
        getMasterLembaga(), // Mengambil data lembaga (termasuk code dan label)
        getMasterKelas()
    ]);

    // 3. Buat kamus (Lookup Map) dengan menyimpan label dan code lembaga
    const lembagaMap = new Map(
        lembagaData.map((lembaga: MasterLembaga) => [
            lembaga.id, 
            { label: lembaga.label, code: lembaga.code }
        ])
    );
    
    const kelasMap = new Map(
        kelasData.map((kelas: MasterKelas) => [kelas.id, kelas.label])
    );

    // 4. Mapping data siswa
    return listSiswa.map((item) => {
        const lembagaInfo = item.lembagaId ? lembagaMap.get(item.lembagaId) : null;
        const lembagaLabel = lembagaInfo ? lembagaInfo.label : '-';
        const lembagaCode = lembagaInfo ? lembagaInfo.code : '';
        const kelasLabel = item.kelasId ? kelasMap.get(item.kelasId) || '-' : '-';

        // Penentuan nilai 'kelas' berdasarkan kode lembaga
        let kelas = lembagaLabel;
        if (lembagaCode === 'MI') {
            kelas = `${lembagaLabel} - ${kelasLabel}`;
        }

        // Penentuan nilai 'nisn' (jika null, fallback ke catatan dengan awalan, atau '-' jika keduanya kosong)
        const nisn = item.nisn || (item.catatan ? `Catatan: ${item.catatan}` : '-');

        return {
            ...item,
            nisn,
            lembagaLabel,
            kelasLabel,
            kelas,
        };
    });
}