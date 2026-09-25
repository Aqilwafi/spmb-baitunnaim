"use client";

import { Button } from "@bn/ui";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

interface ExportLogsButtonProps {
    rawData: any[];
}

export default function ExportLogsButton({ rawData }: ExportLogsButtonProps) {
    const handleExportExcel = () => {
        // 1. Mapping data mentah ke format camelCase sesuai interface BaseActivityLogs
        const formattedData = rawData.map((item) => ({
            id: item.id,
            userId: item.user_id,
            event: item.event,
            status: item.status,
            metadata: item.metadata,
            createdAt: item.created_at,
        }));

        // 2. Format ulang baris agar kolom Excel rapi dan mudah dibaca
        const excelRows = formattedData.map((log) => ({
            "ID Log": log.id,
            "User ID": log.userId,
            "Event": log.event,
            "Status": log.status,
            "Credential": log.metadata?.credential || "-",
            "IP Address": log.metadata?.ip || "-",
            "User Agent": log.metadata?.userAgent || "-",
            "Waktu (Created At)": log.createdAt,
        }));

        // 3. Buat Worksheet dan Workbook menggunakan SheetJS
        const worksheet = XLSX.utils.json_to_sheet(excelRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Logs");

        // 4. Download file .xlsx
        XLSX.writeFile(workbook, `activity-logs-${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    return (
        <Button
            onClick={handleExportExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs flex items-center gap-2 py-2 px-4 rounded-xl shadow-sm transition-colors"
        >
            <Download className="w-4 h-4" /> Export ke Excel
        </Button>
    );
}