// apps/admin/src/components/admin/KeluargaTable.tsx
"use client";

import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell,
  Button 
} from "@bn/ui";
import { Eye, Edit } from "lucide-react";
import type { BiodataKeluargaClientProps } from "./BiodataKeluargaClient";
import { getStatusHidupBadgeClass } from "@bn/utils";

interface KeluargaTableProps extends BiodataKeluargaClientProps {
  onViewDetail?: (siswa: any) => void;
  onEdit?: (siswa: any) => void;
}

export function BiodataKeluargaTable({ data, onViewDetail, onEdit }: KeluargaTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] relative">
        <Table className="w-full text-left border-collapse">
          <TableHead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
            <TableRow>
              <TableHeader className="p-4 w-[26%] bg-gray-50">Nama Anggota Keluarga</TableHeader>
              <TableHeader className="p-4 w-[16%] bg-gray-50">Status Hidup</TableHeader>
              <TableHeader className="p-4 w-[18%] bg-gray-50">Relasi</TableHeader>
              <TableHeader className="p-4 w-[20%] bg-gray-50">Nama Siswa</TableHeader>
              {(onViewDetail || onEdit) && <TableHeader className="p-4 w-[20%] bg-gray-50 text-center">Aksi</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="p-4 font-medium text-gray-900 truncate max-w-[200px]">
                    {item.namaLengkap || "-"}
                  </TableCell>
                  <TableCell className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-block ${getStatusHidupBadgeClass(item.statusHidup)}`}>
                      {item.statusHidup || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-gray-700">
                    {item.formattedRelasi || "-"}
                  </TableCell>
                  <TableCell className="p-4 text-gray-700 font-medium">
                    {item.namaSiswa || "-"}
                  </TableCell>
                  
                  {(onViewDetail || onEdit) && (
                    <TableCell className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Lihat Detail */}
                        {onViewDetail && (
                          <Button
                            variant="ghost"
                            className="px-2.5 py-1.5 h-auto text-xs font-medium text-blue-600 hover:bg-blue-50"
                            onClick={() => onViewDetail(item)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Lihat Detail
                          </Button>
                        )}

                        {/* Opsional: Tombol Edit */}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            className="px-2.5 py-1.5 h-auto text-xs font-medium text-emerald-600 hover:bg-emerald-50"
                            onClick={() => onEdit(item)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-8 text-center text-gray-500">
                  Tidak ada data keluarga yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}