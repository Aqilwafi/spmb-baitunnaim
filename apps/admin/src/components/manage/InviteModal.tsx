// apps/admin/src/components/admin/InviteModal.tsx

"use client";

import { Modal, Button } from "@bn/ui";
import { X } from "lucide-react";
import InviteForm from "@/components/auth/InviteForm"; // Sesuaikan path jika berbeda
import { MasterData } from "@bn/types";

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  roleList: MasterData[];
}

export default function InviteModal({ open, onClose, roleList  }: InviteModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
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
          <InviteForm onSuccess={onClose} roleList={roleList} />
        </div>
      </div>
    </Modal>
  );
}