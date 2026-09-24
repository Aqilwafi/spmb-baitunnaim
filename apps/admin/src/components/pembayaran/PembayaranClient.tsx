"use client";

import { useState } from "react";
import PembayaranTable from "./PembyaranTable";
import PembayaranModal from "./PembayaranModal"; // Sesuaikan path jika berbeda
import type { FormattedPembayaranList } from "@/features/spmb/pembayaran/pembayaran-list";

interface PembayaranClientProps {
  data: FormattedPembayaranList[];
}

export default function PembayaranClient({ data }: PembayaranClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPembayaran, setSelectedPembayaran] = useState<FormattedPembayaranList | null>(null);

  const handleOpenModal = (item: FormattedPembayaranList) => {
    setSelectedPembayaran(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPembayaran(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabel Data Pembayaran dengan callback onDetail / onViewDetail */}
      <PembayaranTable data={data} onDetail={handleOpenModal} />

      {/* Modal Detail & Verifikasi Pembayaran */}
      {selectedPembayaran && (
        <PembayaranModal
          open={isModalOpen}
          onClose={handleCloseModal}
          pembayaranData={selectedPembayaran}
        />
      )}
    </div>
  );
}