// apps/admin/src/app/dashboard/logs/page.tsx

import { getDashboardActivityLogs } from "@/features/logs/all";
import ActivityLogsTable from "@/components/logs/LogsTable";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@bn/ui";

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function ActivityLogsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;
    const limit = 30;

    // Ambil data lewat business logic feature
    const { data: logs, pagination } = await getDashboardActivityLogs({
        page: currentPage,
        limit: limit,
    });

    const totalPages = pagination?.totalPages || 1;
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

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
            <div className="flex-1 overflow-hidden flex flex-col gap-3">
                <div className="flex-1 overflow-hidden">
                    <ActivityLogsTable data={logs} />
                </div>
                
                {/* Bar Informasi & Kontrol Pagination */}
                <div className="py-3 px-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-500 flex justify-between items-center shrink-0 shadow-sm">
                    <span>
                        Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong> (Total: {pagination?.totalData || 0} data log)
                    </span>

                    {/* Tombol Navigasi Pagination */}
                    <div className="flex items-center gap-2">
                        {hasPreviousPage ? (
                            <Link href={`/dashboard/logs?page=${currentPage - 1}`}>
                                <Button
                                    variant="secondary"
                                    className="!py-1.5 !px-3 text-xs flex items-center gap-1 rounded-lg border-gray-200 shadow-none hover:bg-gray-50"
                                >
                                    <ChevronLeft size={14} /> Sebelumnya
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant="secondary"
                                disabled
                                className="!py-1.5 !px-3 text-xs flex items-center gap-1 rounded-lg border-gray-200 opacity-50 cursor-not-allowed shadow-none"
                            >
                                <ChevronLeft size={14} /> Sebelumnya
                            </Button>
                        )}

                        {hasNextPage ? (
                            <Link href={`/dashboard/logs?page=${currentPage + 1}`}>
                                <Button
                                    variant="secondary"
                                    className="!py-1.5 !px-3 text-xs flex items-center gap-1 rounded-lg border-gray-200 shadow-none hover:bg-gray-50"
                                >
                                    Selanjutnya <ChevronRight size={14} />
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant="secondary"
                                disabled
                                className="!py-1.5 !px-3 text-xs flex items-center gap-1 rounded-lg border-gray-200 opacity-50 cursor-not-allowed shadow-none"
                            >
                                Selanjutnya <ChevronRight size={14} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}