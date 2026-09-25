// apps/admin/src/components/admin/SiswaTable.tsx
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
import { Edit } from "lucide-react";
import { BiodataClientProps } from "./BiodataSiswaClient";

interface SiswaTableProps extends BiodataClientProps {
  onEdit?: (siswa: any) => void;
}

export function BiodataSiswaTable({ data, onEdit }: SiswaTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] relative">
        <Table className="w-full text-left border-collapse">
          <TableHead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
            <TableRow>
              <TableHeader className="p-4 w-[32%] bg-gray-50">Nama Lengkap</TableHeader>
              <TableHeader className="p-4 w-[18%] bg-gray-50">NISN</TableHeader>
              <TableHeader className="p-4 w-[18%] bg-gray-50">NIK</TableHeader>
              <TableHeader className="p-4 w-[16%] bg-gray-50">Kelas</TableHeader>
              <TableHeader className="p-4 w-[10%] bg-gray-50">Jenis Kelamin</TableHeader>
              {onEdit && <TableHeader className="p-4 w-[6%] bg-gray-50 text-center">Aksi</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data && data.length > 0 ? (
              data.map((siswa: any) => (
                <TableRow key={siswa.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="p-4 font-medium text-gray-900 truncate max-w-[200px]">
                    {siswa.namaLengkap || "-"}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 font-mono text-xs">
                    {siswa.nisn || "-"}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 font-mono text-xs">
                    {siswa.nik || "-"}
                  </TableCell>
                  <TableCell className="p-4">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full inline-block">
                      {siswa.kelas || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="p-4">
                    {siswa.jenisKelamin === 'FEMALE' ? 'Perempuan' : siswa.jenisKelamin === 'MALE' ? 'Laki-laki' : siswa.jenisKelamin || "-"}
                  </TableCell>
                  {onEdit && (
                    <TableCell className="p-4 text-center">
                      <Button
                        variant="ghost"
                        className="px-2.5 py-1.5 h-auto text-xs font-medium text-blue-600 hover:bg-blue-50"
                        onClick={() => onEdit(siswa)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={onEdit ? 6 : 5} className="p-8 text-center text-gray-500">
                  Tidak ada data siswa yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}