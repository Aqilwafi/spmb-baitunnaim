import ExportLogsButton from "@/components/buttons/ExportLogsButton";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@bn/ui";
import { FileSpreadsheet } from "lucide-react";

// Data Dummy sesuai format Anda
const dummyLogs = [
  {
    "id": "440a2c71-6084-4aa2-981d-b39f39c3c08f",
    "user_id": "a49ec256-d32c-40b0-9423-ebca3881499b",
    "event": "admin_login",
    "status": "success",
    "metadata": {
      "ip": "::1",
      "realIp": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
      "credential": "mtaqilsyiar@gmail.com",
      "forwardedFor": "::1"
    },
    "created_at": "2026-09-21 12:41:36.635747+07"
  },
  {
    "id": "73bef2ca-9895-49f8-a639-e532462a8fcb",
    "user_id": "a49ec256-d32c-40b0-9423-ebca3881499b",
    "event": "admin_login",
    "status": "success",
    "metadata": {
      "ip": "::1",
      "realIp": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
      "credential": "mtaqilsyiar@gmail.com",
      "forwardedFor": "::1"
    },
    "created_at": "2026-09-22 11:38:49.88285+07"
  },
  {
    "id": "9bf3315b-c6ed-416e-ba7e-7eedb0142406",
    "user_id": "c5794cc7-b6a1-433f-bedb-e56b93a06f27",
    "event": "spmb_login",
    "status": "success",
    "metadata": {
      "ip": "::1",
      "realIp": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
      "credential": "seblakpedas998@gmail.com",
      "forwardedFor": "::1"
    },
    "created_at": "2026-09-22 11:43:54.8456+07"
  },
  {
    "id": "71ae337d-d9f6-4e29-b8b4-3eb97eb46890",
    "user_id": "a49ec256-d32c-40b0-9423-ebca3881499b",
    "event": "admin_login",
    "status": "success",
    "metadata": {
      "ip": "::1",
      "realIp": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
      "credential": "mtaqilsyiar@gmail.com",
      "forwardedFor": "::1"
    },
    "created_at": "2026-09-22 11:48:04.800482+07"
  },
  {
    "id": "9f754abf-288f-4035-bff9-e9ab856b05f7",
    "user_id": "a49ec256-d32c-40b0-9423-ebca3881499b",
    "event": "admin_logout",
    "status": "success",
    "metadata": {
      "ip": "::1",
      "realIp": null,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
      "credential": "mtaqilsyiar@gmail.com",
      "forwardedFor": "::1"
    },
    "created_at": "2026-09-22 11:48:38.330928+07"
  }
];

export default function TestLogsExportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header dengan Tombol Export */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Uji Coba Export Excel</h1>
                        <p className="text-xs text-gray-500">Halaman sandbox untuk mengetes fungsionalitas SheetJS pada data log.</p>
                    </div>
                </div>

                {/* Tombol Export */}
                <ExportLogsButton rawData={dummyLogs} />
            </div>

            {/* Tabel Preview Dummy */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 font-semibold text-sm text-gray-800">
                    Preview Data Dummy ({dummyLogs.length} data)
                </div>
                <Table className="text-left text-sm">
                    <TableHead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                        <TableRow>
                            <TableHeader className="py-3 px-4">Waktu</TableHeader>
                            <TableHeader className="py-3 px-4">Event</TableHeader>
                            <TableHeader className="py-3 px-4">Status</TableHeader>
                            <TableHeader className="py-3 px-4">Credential</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-100 text-gray-800">
                        {dummyLogs.map((log) => (
                            <TableRow key={log.id} className="hover:bg-gray-50/50">
                                <TableCell className="py-3 px-4 text-xs text-gray-500">{log.created_at}</TableCell>
                                <TableCell className="py-3 px-4 font-mono text-xs">{log.event}</TableCell>
                                <TableCell className="py-3 px-4 uppercase text-xs font-bold text-green-600">{log.status}</TableCell>
                                <TableCell className="py-3 px-4 text-xs font-mono">{log.metadata.credential}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}