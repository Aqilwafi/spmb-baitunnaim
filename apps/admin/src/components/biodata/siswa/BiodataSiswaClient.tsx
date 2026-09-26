// apps/admin/src/components/biodata/siswa/BiodataSiswaClient.tsx
"use client";

import { useState } from "react";
import { BiodataSiswaTable } from "@/components/biodata/siswa/BiodataSiswaTable"; 
import { BiodataSiswaModal } from "@/components/biodata/siswa/BiodataSiswaModal";
import type { FormattedListSiswa } from "@/features/biodata/siswa";
import type { MasterData } from "@bn/types";

export interface BiodataClientProps {
  data: FormattedListSiswa[];
  lembagaList?: MasterData[];
  kelasList?: MasterData[];
  statusRumahList?: MasterData[];
  tinggalBersamaList?: MasterData[];
}

export default function BiodataSiswaClient({ 
  data,
  lembagaList,
  kelasList,
  statusRumahList,
  tinggalBersamaList
}: BiodataClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState<FormattedListSiswa | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fungsi untuk membuka modal lihat detail (Mode Read-only)
  const handleViewDetail = (siswa: FormattedListSiswa) => {
    setSelectedSiswa(siswa);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // Fungsi untuk membuka modal edit (Mode Editable)
  const handleEdit = (siswa: FormattedListSiswa) => {
    setSelectedSiswa(siswa);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Siswa dengan Tombol Aksi Lihat & Edit */}
      <BiodataSiswaTable 
        data={data} 
        onViewDetail={handleViewDetail}
        onEdit={handleEdit} 
      />

      {/* Modal Detail / Edit Siswa */}
      <BiodataSiswaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedSiswa}
        isEdit={isEditMode}
        onSave={(updatedData) => {
          // TODO: Tambahkan handler API/state update data jika diperlukan
          console.log("Data siswa disimpan:", updatedData);
        }}
        lembagaList={lembagaList}
        kelasList={kelasList}
        statusRumahList={statusRumahList}
        tinggalBersamaList={tinggalBersamaList}
      />
    </div>
  );
}