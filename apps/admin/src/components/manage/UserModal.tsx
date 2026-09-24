// apps/admin/src/components/admin/UserModal.tsx (atau AdminModal.tsx)

"use client";

import { Modal, Button } from "@bn/ui";
import { X } from "lucide-react";
import { MasterData } from "@bn/types";
import UserForm from "../auth/UserForm"; // Sesuaikan path jika file form-nya dipindah

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  roleList?: MasterData[];
  user: any;
  showRole?: boolean; // Prop penentu apakah menampilkan fitur role atau tidak
}

export default function UserModal({ open, onClose, roleList = [], user, showRole = true }: UserModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative">
        {/* Tombol Close (X) */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute right-0 top-0 !p-2 rounded-xl text-gray-400 hover:text-gray-600 shadow-none"
          type="button"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Bungkus Form dengan meneruskan prop showRole */}
        <div className="pt-2">
          <UserForm 
            onSuccess={onClose} 
            roleList={roleList} 
            user={user} 
            showRole={showRole} 
          />
        </div>
      </div>
    </Modal>
  );
}