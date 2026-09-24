import { getPembayaranList, type PembayaranList } from "@/services/spmb/pembayaran/pembayaran-list";
import { getPembayaranUrl } from "@/services/spmb/pembayaran/pembayaran-url";
import { getUsernames } from "@/services/users/name";
import { maskId } from "@bn/utils";

export interface FormattedPembayaranList extends PembayaranList {
    maskedId: string;
    verifikatorName?: string | null;
    url?: string | null;
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

    // 2. Kumpulkan semua path buktiBayar yang ada isinya untuk di-batching
    const buktiBayarPaths = Array.from(
        new Set(
            pembayaran
                .map((item: any) => item.buktiBayar)
                .filter((path): path is string => Boolean(path))
        )
    );

    // 3. Ambil data verifikator dan signed URL secara paralel (jika ada)
    let verifikatorMap = new Map<string, string>();
    let urlMap = new Map<string, string>();

    const promises: Promise<any>[] = [];

    if (verifikatorIds.length > 0) {
        promises.push(
            getUsernames(verifikatorIds).then((verifikatorData) => {
                verifikatorData.forEach((v: any) => {
                    const identifier = v.username || v.email;
                    if (v.id && identifier) {
                        verifikatorMap.set(v.id, identifier);
                    }
                });
            })
        );
    }

    if (buktiBayarPaths.length > 0) {
        promises.push(
            getPembayaranUrl(buktiBayarPaths).then((urls) => {
                // Mapping path asli ke signed URL yang dikembalikan sesuai urutan
                buktiBayarPaths.forEach((path, index) => {
                    if (urls[index]) {
                        urlMap.set(path, urls[index]);
                    }
                });
            })
        );
    }

    if (promises.length > 0) {
        await Promise.all(promises);
    }

    // 4. Mapping data pembayaran, tambahkan maskedId, verifikatorName, dan url
    const formattedData = pembayaran.map((item: any) => {
        const verifId = item.verifiedBy || item.verified_by;
        const verifikatorName = verifId ? verifikatorMap.get(verifId) || null : null;
        const url = item.buktiBayar ? urlMap.get(item.buktiBayar) || null : null;

        return {
            ...item,
            maskedId: maskId(item.id),
            verifikatorName,
            url,
        };
    });

    // 5. Sorting kustom: Prioritaskan PENDING / SUBMITTED di atas, lalu urutkan berdasarkan terbaru
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