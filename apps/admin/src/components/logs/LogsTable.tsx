"use client";

import { useState } from "react";
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from "@bn/ui";
import { Button } from "@bn/ui"; 
import { formatDetailDateTimeId } from "@bn/utils";
import { Activity, X, ShieldAlert, CheckCircle2 } from "lucide-react";

interface ActivityLogsTableProps {
  data: any[];
}

export default function ActivityLogsTable({ data }: ActivityLogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
        <div className="max-h-[450px] overflow-y-auto relative">
          <Table className="text-left text-sm">
            <TableHead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold sticky top-0 z-10">
              <TableRow>
                <TableHeader className="py-3.5 px-4 bg-gray-50">Waktu</TableHeader>
                <TableHeader className="py-3.5 px-4 bg-gray-50">Actor</TableHeader>
                <TableHeader className="py-3.5 px-4 bg-gray-50">Event</TableHeader>
                <TableHeader className="py-3.5 px-4 bg-gray-50">Status</TableHeader>
                <TableHeader className="py-3.5 px-4 bg-gray-50">Credential / Target</TableHeader>
                <TableHeader className="py-3.5 px-4 bg-gray-50 text-center">Aksi</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y divide-gray-100 text-gray-800">
              {data && data.length > 0 ? (
                data.map((item) => {
                  const isSuccess = item.status === "success";

                  return (
                    <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Waktu */}
                      <TableCell className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.createdAt || item.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "medium",
                        })}
                      </TableCell>

                      {/* Actor (Username / Email / Anonimus: creds) */}
                      <TableCell className="py-3.5 px-4 text-xs font-medium text-gray-900">
                        <span className="truncate max-w-[180px] block" title={item.actorName}>
                          {item.actorName || "-"}
                        </span>
                      </TableCell>

                      {/* Event */}
                      <TableCell className="py-3.5 px-4 font-semibold text-gray-900">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-mono">
                          {item.event}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase rounded-md border ${
                          isSuccess 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {isSuccess ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </TableCell>

                      {/* Credential dari Metadata */}
                      <TableCell className="py-3.5 px-4 text-xs text-gray-600 font-mono">
                        {item.metadata?.credential || "-"}
                      </TableCell>

                      {/* Tombol Detail (Memicu Modal) */}
                      <TableCell className="py-3.5 px-4 text-center">
                        <Button
                          onClick={() => setSelectedLog(item)}
                          className="!py-1.5 !px-3 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 rounded-lg shadow-none mx-auto"
                        >
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-gray-400">
                    Belum ada data activity log.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MODAL DETAIL LOG (LEBIH LEBAR & BACKGROUND FREEZE) */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {/* Container Modal Diperlebar menjadi max-w-3xl */}
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-gray-200 flex flex-col gap-5 animate-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 text-base">Detail Log Aktivitas Lengkap</h3>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Konten Detail Lengkap (Layout Grid Lebih Lega karena Modal Lebar) */}
            <div className="flex flex-col gap-4 text-xs text-gray-700 max-h-[65vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">ID LOG</span>
                  <span className="font-mono text-gray-800 break-all">{selectedLog.id}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">USER ID (ASLI)</span>
                  <span className="font-mono text-gray-800 break-all">{selectedLog.userId || selectedLog.user_id || "Null"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">ACTOR NAME?</span>
                  <span className="font-bold text-gray-900 break-all text-sm">{selectedLog.actorName || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">STATUS</span>
                  <span className="font-bold uppercase text-gray-900">{selectedLog.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">EVENT</span>
                  <span className="font-bold text-gray-900">{selectedLog.event}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium mb-0.5">WAKTU</span>
                  <span className="text-gray-800">
                    {formatDetailDateTimeId(selectedLog.createdAt)}
                  </span>
                </div>
              </div>

              {/* Tampilan Metadata Lengkap (JSON) */}
              <div>
                <span className="font-semibold text-gray-500 block mb-1.5">METADATA (RAW JSON):</span>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="flex justify-end pt-3 border-t">
              <Button
                onClick={() => setSelectedLog(null)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-5 py-2 rounded-lg shadow-none"
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}