// apps/admin/src/components/admin/ManageAdminClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@bn/ui";
import { UserPlus } from "lucide-react";
import InviteModal from "./InviteModal";
import UserModal from "./UserModal";
import { UsersTable } from "./UsersTable"; // Import komponen tabel yang baru
import type { MasterData } from "@bn/types";

interface ManageAdminClientProps {
  users: any[];
  roleList: MasterData[];
}

export default function ManageAdminClient({ users, roleList }: ManageAdminClientProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null); // State untuk menyimpan user yang dipilih

  const handleOpenAdminModal = (user: any) => {
    setSelectedUser(user);
    setIsAdminOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tombol Aksi di Atas Tabel */}
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={() => setIsInviteOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Undang Admin Baru
        </Button>
      </div>

      {/* Tabel Data Admin (Dirender via UsersTable dengan tombol Edit aktif) */}
      <UsersTable users={users} onEdit={handleOpenAdminModal} />

      {/* Modal Invite */}
      <InviteModal 
        open={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        roleList={roleList}
      />

      {/* Modal Admin (Edit/Detail) */}
      <UserModal  
        open={isAdminOpen} 
        onClose={() => {
          setIsAdminOpen(false);
          setSelectedUser(null);
        }} 
        roleList={roleList}
        user={selectedUser} // Mengirim data user terpilih ke modal
      />
    </div>
  );
}