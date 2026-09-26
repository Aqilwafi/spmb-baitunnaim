// apps/admin/src/components/admin/BiodataSiswaModal.tsx
"use client";

import { X } from "lucide-react";
import { Modal, Button } from "@bn/ui";
import { BiodataSiswaForm } from "./BiodataSiswaForm";
import type { FormattedListSiswa } from "@/features/biodata/siswa";
import type { MasterData } from "@bn/types";

interface BiodataSiswaModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: FormattedListSiswa | null;
  isEdit?: boolean;
  onSave?: (updatedData: any) => void;
  lembagaList?: MasterData[];
  kelasList?: MasterData[];
  statusRumahList?: MasterData[];
  tinggalBersamaList?: MasterData[];
}

export function BiodataSiswaModal({
  isOpen,
  onClose,
  data,
  isEdit = false,
  onSave,
  lembagaList,
  kelasList,
  statusRumahList,
  tinggalBersamaList,
}: BiodataSiswaModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="relative">
        {/* Header Modal & Tombol Close (X) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {isEdit ? "Edit Biodata Siswa" : "Detail Biodata Siswa"}
            </h2>
            <p className="text-xs text-gray-500">
              {isEdit ? "Perbarui informasi siswa di bawah ini." : "Informasi detail lengkap siswa."}
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
          <BiodataSiswaForm
            initialData={data}
            isEdit={isEdit}
            onSubmit={(formData) => {
              if (onSave) onSave(formData);
              onClose();
            }}
            onCancel={onClose}
            lembagaList={lembagaList}
            kelasList={kelasList}
            statusRumahList={statusRumahList}
            tinggalBersamaList={tinggalBersamaList}
          />
        </div>
      </div>
    </Modal>
  );
}