// apps/admin/src/components/admin/ManageAdminClient.tsx
"use client";

import { useState } from "react";
import { Button, Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@bn/ui";
import { UserPlus } from "lucide-react";
import InviteModal from "./InviteModal";
import type { MasterData } from "@bn/types";

interface ManageAdminClientProps {
  users: any[];
  roleList: MasterData[];
}

export default function ManageAdminClient({ users, roleList }: ManageAdminClientProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tombol Aksi di Atas Tabel */}
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={() => setIsInviteOpen(true)}
        >
          <UserPlus className="w-4 h-4" />
          Undang Admin Baru
        </Button>
      </div>

      {/* Tabel Data Admin */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHead className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <TableRow><TableHeader className="p-4">Username</TableHeader><TableHeader className="p-4">Email</TableHeader><TableHeader className="p-4">Role</TableHeader><TableHeader className="p-4">Telepon</TableHeader><TableHeader className="p-4">Bergabung</TableHeader></TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-200 text-sm text-gray-700">
              {users && users.length > 0 ? (
                users.map((user: any) => (
                  <TableRow key={user.userRoleId} className="hover:bg-gray-50 transition-colors"><TableCell className="p-4 font-medium text-gray-900">{user.username || "-"}</TableCell><TableCell className="p-4">{user.email || "-"}</TableCell><TableCell className="p-4"><span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">{user.roleName || "-"}</span></TableCell><TableCell className="p-4">{user.phone || "-"}</TableCell><TableCell className="p-4 text-gray-500">{formatDate(user.accountCreatedAt || user.created_at)}</TableCell></TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="p-8 text-center text-gray-500">Tidak ada data admin yang ditemukan.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal Invite */}
      <InviteModal 
        open={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        roleList={roleList}
      />
    </div>
  );
}