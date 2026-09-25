// apps/admin/src/components/admin/ManagePendaftarClient.tsx
"use client";

import { useState } from "react";
import { BiodataSiswaTable } from "./BiodataSiswaTable"; 
import type { FormattedListSiswa } from "@/features/biodata/siswa";
import type { ListKeluarga } from "@/services/biodata/keluarga/list";

export interface BiodataClientProps {
  data: FormattedListSiswa[] | ListKeluarga[];
}

// harus bisa untuk biodata siswa dan keluarga.

export default function BiodataSiswaClient({ data }: BiodataClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Pendaftar dengan tombol Edit aktif */}
      <BiodataSiswaTable data={data} onEdit={handleOpenModal} />

    </div>
  );
}