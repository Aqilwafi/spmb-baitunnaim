// apps/admin/src/components/pembayaran/PembayaranTable.tsx

"use client";

import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from "@bn/ui";
import { Button } from "@bn/ui"; 
import { formatDateTimeId } from "@bn/utils";
import type { FormattedPembayaranList } from "@/features/spmb/pembayaran/pembayaran-list";
import { useRouter } from "next/navigation"; 

interface PembayaranTableProps {
  data: FormattedPembayaranList[];
}

export default function PembayaranTable({ data }: PembayaranTableProps) {
  const router = useRouter(); 

  return (
    <div className="bg-white rounded-2xl max-h-screen border border-gray-200 overflow-hidden shadow-sm">
      {/* Container Scrollable Khusus untuk Tabel */}
      <div className="max-h-[500px] overflow-y-auto relative">
        <Table className="text-left text-sm">
          <TableHead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold sticky top-0 z-10">
            <TableRow>
              <TableHeader className="py-3.5 px-4 bg-gray-50">Pembayaran ID</TableHeader>
              <TableHeader className="py-3.5 px-4 bg-gray-50">Nama Siswa</TableHeader>
              <TableHeader className="py-3.5 px-4 bg-gray-50">Tanggal Upload</TableHeader>
              <TableHeader className="py-3.5 px-4 bg-gray-50">Status Verifikasi</TableHeader>
              <TableHeader className="py-3.5 px-4 bg-gray-50 text-center">Detail</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y divide-gray-100 text-gray-800">
            {data && data.length > 0 ? (
              data.map((item) => {
                const statusLower = item.status?.toLowerCase() || "";
                const isPendingOrSubmitted = statusLower === "submitted" || statusLower === "pending";

                return (
                  <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Kolom Pembayaran ID */}
                    <TableCell className="py-3.5 px-4 font-mono text-xs max-w-[150px]">
                      <div className="break-all text-gray-900 font-semibold">
                        {item.id}
                      </div>
                    </TableCell>
                    
                    {/* Kolom Nama Siswa dengan Form ID di bawahnya */}
                    <TableCell className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {item.namaLengkap || "-"}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          FORM ID: {item.maskedId}
                        </span>
                      </div>
                    </TableCell>

                    {/* Kolom Tanggal Upload */}
                    <TableCell className="py-3.5 px-4 text-gray-500 text-xs max-w-[140px]">
                      <div className="break-words">
                        {formatDateTimeId(item.createdAt)}
                      </div>
                    </TableCell>

                    {/* Kolom Status / Keterangan Verifikasi */}
                    <TableCell className="py-3.5 px-4 max-w-[150px]">
                      {isPendingOrSubmitted ? (
                        <div className="flex flex-col gap-1">
                          <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-amber-50 text-amber-700 border border-amber-200 w-fit">
                            {item.status} 
                          </span>
                          <span className="text-[11px] text-gray-400 italic">
                            Menunggu verifikasi
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col text-xs text-gray-600 break-words">
                          <span className="font-medium text-gray-400 leading-snug">
                            Diverifikasi oleh <strong className="font-medium text-gray-800 leading-snug">{item.verifikatorName || "Admin"}</strong>
                          </span>
                          <span className="text-[11px] text-gray-400 mt-0.5">
                            pada {item.verifiedAt ? formatDateTimeId(item.verifiedAt) : "-"}
                          </span>
                        </div>
                      )}
                    </TableCell>

                    {/* Kolom Aksi / Tombol Detail */}
                    <TableCell className="py-3.5 px-4 text-center">
                      <Button
                        onClick={() => router.push(`/dashboard/pembayaran/${item.id}`)}
                        className="!py-1.5 !px-3 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-100 rounded-lg shadow-none mx-auto"
                      >
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-400">
                  Belum ada data pembayaran.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}