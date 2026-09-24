// apps/admin/src/components/admin/UsersTable.tsx
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
import { formatDateId } from "@bn/utils";

interface UsersTableProps {
  users: any[];
  onEdit?: (user: any) => void; // Opsional: jika ada fungsi edit, kolom aksi akan muncul
}

export function UsersTable({ users, onEdit }: UsersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Bungkus dengan max-h dan overflow-y-auto agar scroll vertikal aktif di tabel saja */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] relative">
        <Table>
          {/* Tambahkan sticky top-0 dan z-10 agar header ikut menempel saat discroll */}
          <TableHead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
            <TableRow>
              <TableHeader className="p-4 bg-gray-50">Username</TableHeader>
              <TableHeader className="p-4 bg-gray-50">Email</TableHeader>
              <TableHeader className="p-4 bg-gray-50">Role</TableHeader>
              <TableHeader className="p-4 bg-gray-50">Telepon</TableHeader>
              <TableHeader className="p-4 bg-gray-50">Bergabung</TableHeader>
              {onEdit && <TableHeader className="p-4 bg-gray-50 text-center">Aksi</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 text-sm text-gray-700">
            {users && users.length > 0 ? (
              users.map((user: any) => (
                <TableRow key={user.userRoleId || user.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="p-4 font-medium text-gray-900">{user.username || "-"}</TableCell>
                  <TableCell className="p-4">{user.email || "-"}</TableCell>
                  <TableCell className="p-4">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">
                      {user.roleName || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="p-4">{user.phone || "-"}</TableCell>
                  <TableCell className="p-4 text-gray-500">
                    {formatDateId(user.accountCreatedAt || user.created_at)}
                  </TableCell>
                  {onEdit && (
                    <TableCell className="p-4 text-center">
                      <Button
                        variant="ghost"
                        className="px-3 py-1.5 h-auto text-xs font-medium text-blue-600 hover:bg-blue-50"
                        onClick={() => onEdit(user)}
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
                  Tidak ada data admin yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}