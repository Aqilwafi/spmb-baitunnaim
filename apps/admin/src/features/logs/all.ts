import "server-only";
import { getAllActivityLogs, type BaseActivityLogs } from "@/services/logs/all"; 
import { getUsernames } from "@/services/users/name";
import type { Profiles } from "@bn/types";

export interface CustomActivityLogs extends BaseActivityLogs {
    actorName?: Profiles['username'] | Profiles['email'] | Profiles['id'] | string;
}

interface GetLogsBusinessLogicParams {
    page?: number;
    limit?: number;
}

export async function getDashboardActivityLogs({ page = 1, limit = 30 }: GetLogsBusinessLogicParams = {}) {
    // Validasi sederhana: jika halaman kurang dari 1, langsung return data kosong tanpa query ke database
    if (page < 1 || limit < 1) {
        return {
            data: [] as CustomActivityLogs[],
            pagination: {
                currentPage: page,
                limit,
                totalData: 0,
                totalPages: 0,
                hasNextPage: false,
                hasPrevPage: false,
            }
        };
    }

    try {
        // 1. Panggil fungsi pengambilan data utama
        const result = await getAllActivityLogs({ page, limit });

        if (!result.data || result.data.length === 0) {
            return {
                data: [] as CustomActivityLogs[],
                pagination: result.pagination,
            };
        }

        // 2. Kumpulkan semua unique `userId` yang tidak null/undefined untuk di-batch query
        const userIds = Array.from(
            new Set(result.data.map((log) => log.userId).filter(Boolean))
        ) as string[];

        // 3. Ambil data nama/username/email berdasarkan array userId (asumsi getUsernames menerima string[])
        // Map hasil agar mudah dicari menggunakan key ID-nya
        let userMap = new Map<string, string>();
        if (userIds.length > 0) {
            const profilesData = await getUsernames(userIds);
            // Sesuaikan struktur data profilesData dengan hasil return dari service getUsernames kamu
            if (profilesData && Array.isArray(profilesData)) {
                profilesData.forEach((profile: any) => {
                    // Prioritaskan username, jika tidak ada pakai email atau id
                    const identifier = profile.username || profile.email || profile.id;
                    if (profile.id) {
                        userMap.set(profile.id, identifier);
                    }
                });
            }
        }

        // 4. Lakukan mapping data log ke CustomActivityLogs dengan menyertakan actorName
        const enhancedData: CustomActivityLogs[] = result.data.map((log) => {
            let actorName = "System / Guest";

            if (log.userId) {
                // Cari dari map user yang sudah di-fetch
                actorName = userMap.get(log.userId) || log.userId;
            } else if (log.metadata && typeof log.metadata === "object" && "credential" in log.metadata && log.metadata.credential) {
                // Jika userId null tapi ada credential di metadata (misal gagal login)
                actorName = `Anonimus: ${log.metadata.credential}`;
            }

            return {
                ...log,
                actorName,
            };
        });

        return {
            data: enhancedData,
            pagination: result.pagination,
        };

    } catch (error) {
        console.error("Business logic error saat mengambil activity logs:", error);
        
        // Return aman jika terjadi error (tidak membuat halaman crash total)
        return {
            data: [] as CustomActivityLogs[],
            pagination: {
                currentPage: page,
                limit,
                totalData: 0,
                totalPages: 0,
                hasNextPage: false,
                hasPrevPage: false,
            }
        };
    }
}