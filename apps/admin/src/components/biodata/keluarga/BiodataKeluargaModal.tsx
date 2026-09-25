// apps/admin/src/components/admin/BiodataKeluargaModal.tsx
"use client";

import { X } from "lucide-react";
import { Modal, Button } from "@bn/ui";
import { BiodataKeluargaForm } from "./BiodataKeluargaForm";
import type { FormattedListKeluarga } from "@/features/biodata/keluarga";

interface BiodataKeluargaModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: FormattedListKeluarga | null;
  isEdit?: boolean;
  onSave?: (updatedData: any) => void;
}

export function BiodataKeluargaModal({
  isOpen,
  onClose,
  data,
  isEdit = false,
  onSave,
}: BiodataKeluargaModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="relative">
        {/* Header Modal & Tombol Close (X) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {isEdit ? "Edit Biodata Keluarga" : "Detail Biodata Keluarga"}
            </h2>
            <p className="text-xs text-gray-500">
              {isEdit ? "Perbarui informasi anggota keluarga di bawah ini." : "Informasi detail anggota keluarga."}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="!p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors shadow-none"
            type="button"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body Form */}
        <div className="pt-2 max-h-[75vh] overflow-y-auto">
          <BiodataKeluargaForm
            initialData={data}
            isEdit={isEdit}
            onSubmit={(formData) => {
              if (onSave) onSave(formData);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}