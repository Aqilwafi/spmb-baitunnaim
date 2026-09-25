// apps/admin/src/components/admin/ManagePendaftarClient.tsx
"use client";

import { useState } from "react";
import { BiodataTable } from "./BiodataTable"; 
import type { FormattedListSiswa } from "@/features/biodata/siswa";

interface BiodataClientProps {
  list: FormattedListSiswa[] | any // | listKeluarga (nanti dulu);
}

// harus bisa untuk biodata siswa dan keluarga.

export default function BiodataClient({ list }: BiodataClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Pendaftar dengan tombol Edit aktif */}
      <BiodataTable data={list} onEdit={handleOpenModal} />

     
    </div>
  );
}