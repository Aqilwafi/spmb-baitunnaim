// apps/admin/src/components/admin/InviteModal.tsx

"use client";

import { Modal, Button, type ModalProps } from "@bn/ui";
import { X } from "lucide-react";
import PembayaranForm from "./PembayaranForm"; // Sesuaikan path jika berbeda
import type { FormattedPembayaranList } from "@/features/spmb/pembayaran/pembayaran-list";

interface PembayaranModalProps extends ModalProps{
  pembayaranData: FormattedPembayaranList;
}

export default function PembayaranModal({ open, onClose, pembayaranData }: PembayaranModalProps) {
  return (
    <Modal open={open} onClose={onClose} className="max-w-4xl"> 
      <div className="relative">
        {/* Tombol Close (X) menggunakan @bn/ui Button variant ghost */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute right-0 top-0 !p-2 rounded-xl text-gray-400 hover:text-gray-600 shadow-none"
          type="button"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Bungkus Form */}
        <div className="pt-2">
          <PembayaranForm onSuccess={onClose} pembayaranData={pembayaranData} />
        </div>
      </div>
    </Modal>
  );
}