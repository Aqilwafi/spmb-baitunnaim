import { getPembayaranList, type PembayaranList } from "@/services/spmb/pembayaran/pembayaran-list";
import { getUsernames } from "@/services/users/name";
import { maskId } from "@bn/utils";
import type { EnumStatusPembayaran } from "@bn/types";

export interface FormattedPembayaranList extends PembayaranList {
    maskedId: string;
    verifikatorName?: string | null;
     // Menggunakan tipe enum yang tersedia
}

export async function getPembayaranListData(): Promise<FormattedPembayaranList[]> {
    const pembayaran = await getPembayaranList();

    if (!pembayaran || pembayaran.length === 0) {
        return [];
    }

    // 1. Kumpulkan semua ID verifikator yang unik
    const verifikatorIds = Array.from(
        new Set(
            pembayaran
                .map((item: any) => item.verifiedBy || item.verified_by)
                .filter((id): id is string => Boolean(id))
        )
    );

    // 2. Ambil data verifikator sekaligus jika ada ID-nya
    let verifikatorMap = new Map<string, string>();
    if (verifikatorIds.length > 0) {
        const verifikatorData = await getUsernames(verifikatorIds);
        
        verifikatorData.forEach((v: any) => {
            const identifier = v.username || v.email;
            if (v.id && identifier) {
                verifikatorMap.set(v.id, identifier);
            }
        });
    }

    // 3. Mapping data pembayaran, tambahkan maskedId dan verifikatorName
    const formattedData = pembayaran.map((item: any) => {
        const verifId = item.verifiedBy || item.verified_by;
        const verifikatorName = verifId ? verifikatorMap.get(verifId) || null : null;

        return {
            ...item,
            maskedId: maskId(item.id),
            verifikatorName,
        };
    });

    // 4. Sorting kustom: Prioritaskan PENDING / SUBMITTED di atas, lalu urutkan berdasarkan terbaru
    return formattedData.sort((a, b) => {
        const statusA = (a.status || "").toUpperCase();
        const statusB = (b.status || "").toUpperCase();

        const isPendingA = statusA === "PENDING" || statusA === "SUBMITTED";
        const isPendingB = statusB === "PENDING" || statusB === "SUBMITTED";

        // Jika A pending/submitted dan B tidak, A ditaruh di atas
        if (isPendingA && !isPendingB) return -1;
        // Jika B pending/submitted dan A tidak, B ditaruh di atas
        if (!isPendingA && isPendingB) return 1;

        // Jika status setara, urutkan dari tanggal terbaru (descending)
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
    });
}