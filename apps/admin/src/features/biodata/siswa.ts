// features

import { getListSiswa, type ListSiswa } from "@/services/biodata/siswa/list";
import { getEmailPemilikDataSiswa } from "@/services/biodata/siswa/siswa";
import { getMasterKelas, getMasterLembaga, getMasterStatusRumah, getMasterTinggalBersama } from "@bn/services";
import { MasterKelas, MasterLembaga, MasterStatusRumah, MasterTinggalBersama, Profiles } from "@bn/types";

export interface FormattedListSiswa extends ListSiswa {
    kelas: string; // kelas adalah gabungan LembagaLabel - KelasLabel (jika MI) atau hanya LembagaLabel
    lembagaLabel: MasterLembaga['label'];
    kelasLabel: MasterKelas['label'];
    email: Profiles['email'];
    statusRumah: MasterStatusRumah['label'];
    tinggalBersama: MasterTinggalBersama['label'];
}

export async function getSiswaListData(): Promise<FormattedListSiswa[]> {
    const listSiswa = await getListSiswa();

    if (!listSiswa || listSiswa.length === 0) {
        return [];
    }

    // 1. Ambil daftar unique ID pemilik data (ownerIds) untuk di-query sekaligus
    const ownerIds = Array.from(
        new Set(listSiswa.map((item) => item.pemilikData).filter(Boolean))
    ) as string[];

    // 2. Ambil data master dan email pemilik secara paralel agar efisien
    const [
        lembagaData, 
        kelasData, 
        statusRumahData, 
        tinggalBersamaData, 
        listEmail
    ] = await Promise.all([
        getMasterLembaga(),
        getMasterKelas(),
        getMasterStatusRumah(),
        getMasterTinggalBersama(),
        getEmailPemilikDataSiswa(ownerIds),
    ]);

    // 3. Buat kamus (Lookup Map) untuk pencarian data yang instan O(1)
    const lembagaMap = new Map(
        lembagaData.map((lembaga: MasterLembaga) => [
            lembaga.id, 
            { label: lembaga.label, code: lembaga.code }
        ])
    );
    
    const kelasMap = new Map(
        kelasData.map((kelas: MasterKelas) => [kelas.id, kelas.label])
    );

    const statusRumahMap = new Map(
        statusRumahData.map((item: MasterStatusRumah) => [item.id, item.label])
    );

    const tinggalBersamaMap = new Map(
        tinggalBersamaData.map((item: MasterTinggalBersama) => [item.id, item.label])
    );

    const emailMap = new Map(
        listEmail.map((item) => [item.id, item.email])
    );

    // 4. Mapping data siswa & format hasilnya
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

        // Lookup data relasi tambahan
        const email = item.pemilikData ? emailMap.get(item.pemilikData) || '-' : '-';
        const statusRumah = item.statusRumahId ? statusRumahMap.get(item.statusRumahId) || '-' : '-';
        const tinggalBersama = item.tinggalBersamaId ? tinggalBersamaMap.get(item.tinggalBersamaId) || '-' : '-';

        return {
            ...item,
            nisn,
            lembagaLabel,
            kelasLabel,
            kelas,
            email,
            statusRumah,
            tinggalBersama,
        };
    });
}