// apps/admin/src/app/dashboard/logs/page.tsx

import { getDashboardActivityLogs } from "@/features/logs/all";
import ActivityLogsTable from "@/components/logs/LogsTable";
import { Activity } from "lucide-react";

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function ActivityLogsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;

    // Ambil data lewat business logic feature
    const { data: logs, pagination } = await getDashboardActivityLogs({
        page: currentPage,
        limit: 30,
    });

    return (
        <div className="flex flex-col gap-6 h-full overflow-hidden">
            {/* Header Halaman */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm shrink-0 flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Activity className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-900">Activity Logs</h1>
                    <p className="text-xs text-gray-500">Pantau riwayat aktivitas login dan sistem secara *real-time*.</p>
                </div>
            </div>

            {/* Komponen Tabel & Modal */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <ActivityLogsTable data={logs} />
                
                {/* Informasi Pagination Sederhana di Bawah */}
                <div className="py-3 px-4 mt-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-500 flex justify-between items-center shrink-0 shadow-sm">
                    <span>
                        Halaman <strong>{pagination.currentPage}</strong> dari <strong>{pagination.totalPages || 1}</strong> (Total: {pagination.totalData} data log)
                    </span>
                </div>
            </div>
        </div>
    );
}