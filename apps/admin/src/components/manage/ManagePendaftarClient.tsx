// apps/admin/src/components/admin/ManagePendaftarClient.tsx
"use client";

import { useState } from "react";
import { UsersTable } from "./UsersTable";
import UserModal from "./UserModal"; // Import modal universal
import type { MasterData } from "@bn/types";

interface ManagePendaftarClientProps {
  users: any[];
  roleList: MasterData[];
}

export default function ManagePendaftarClient({ users, roleList }: ManagePendaftarClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Pendaftar dengan tombol Edit aktif */}
      <UsersTable users={users} onEdit={handleOpenModal} />

      {/* Modal Edit Pendaftar (showRole diset false) */}
      <UserModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        showRole={false} // Penting: Pendaftar tidak butuh manajemen role
      />
    </div>
  );
}