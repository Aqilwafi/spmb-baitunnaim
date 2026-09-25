// apps/admin/src/components/admin/ManagePendaftarClient.tsx
"use client";

import { useState } from "react";
import { BiodataKeluargaTable } from "./BiodataKeluargaTable"; 
import { BiodataKeluargaModal } from "./BiodataKeluargaModal"; // Impor modal yang sudah dibuat sebelumnya
import type { FormattedListKeluarga } from "@/features/biodata/keluarga";

export interface BiodataKeluargaClientProps {
  data: FormattedListKeluarga[];
}

export default function BiodataKeluargaClient({ data }: BiodataKeluargaClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FormattedListKeluarga | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fungsi untuk membuka modal lihat detail
  const handleViewDetail = (user: FormattedListKeluarga) => {
    setSelectedUser(user);
    setIsEditMode(false); // Mode Read-only
    setIsModalOpen(true);
  };

  // Opsional: Jika ingin ada fungsi Edit langsung dari tabel
  const handleEdit = (user: FormattedListKeluarga) => {
    setSelectedUser(user);
    setIsEditMode(true); // Mode Editable
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Pendaftar */}
      <BiodataKeluargaTable 
        data={data} 
        onViewDetail={handleViewDetail} 
        onEdit={handleEdit} 
      />

      {/* Modal Detail / Edit Keluarga */}
      <BiodataKeluargaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedUser}
        isEdit={isEditMode}
        onSave={(updatedData) => {
          console.log("Data tersimpan:", updatedData);
          // Tambahkan logika update/refresh data di sini jika diperlukan
        }}
      />
    </div>
  );
}