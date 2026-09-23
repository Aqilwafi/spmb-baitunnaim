import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { ActivityLogs } from "@bn/types";

export interface BaseActivityLogs {
    id: ActivityLogs['id'];
    userId: ActivityLogs['id'];
    event: ActivityLogs['event'];
    status: ActivityLogs['status'];
    metadata: ActivityLogs['metadata'];
    createdAt: ActivityLogs['created_at'];
}

interface GetActivityLogsParams {
    page?: number;
    limit?: number;
}

export interface ActivityLogsResponse {
    data: BaseActivityLogs[];
    pagination: {
        currentPage: number;
        limit: number;
        totalData: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export async function getAllActivityLogs({ page = 1, limit = 30 }: GetActivityLogsParams = {}): Promise<ActivityLogsResponse> {
    const supabase = await createSupabaseServer();

    // Hitung range untuk pagination Supabase (0-index based)
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Query data dengan urutan created_at descending + pagination + ambil total count
    const { data, error, count } = await supabase
        .from('activity_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        throw new Error(`Gagal mengambil activity logs: ${error.message}`);
    }

    const totalData = count || 0;
    const totalPages = Math.ceil(totalData / limit);

    // Lakukan mapping dari kolom database snake_case ke interface camelCase (BaseActivityLogs)
    const mappedData: BaseActivityLogs[] = (data || []).map((item: any) => ({
        id: item.id,
        userId: item.user_id, // Mapping user_id ke userId
        event: item.event,
        status: item.status,
        metadata: item.metadata,
        createdAt: item.created_at, // Mapping created_at ke createdAt
    }));

    return {
        data: mappedData,
        pagination: {
            currentPage: page,
            limit,
            totalData,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        }
    };
}