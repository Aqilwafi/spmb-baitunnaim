// config/step-pages.config.tsx

import DaftarAkunStep from "@/components/step/InitFormStep";
import PembayaranStep from "@/components/step/pembayaranStep";
import BiodataSiswaLengkapForm from "@/components/step/BiodataSiswaStep";
import type { StepConfigItem } from "@/types/step.types";

// Placeholder sementara untuk step yang belum dibangun
function ComingSoonStep() {
  return <div className="p-8 text-center text-gray-400">Segera hadir</div>;
}

export const STEP_CONFIG: StepConfigItem[] = [
  { id: 1, step_order: 1, code: 'FORM', label: 'Buat Form', component: DaftarAkunStep },
  { id: 2, step_order: 2, code: 'PAYMENT', label: 'Pembayaran', component: PembayaranStep },
  { id: 3, step_order: 3, code: 'BIODATA_STUDENT', label: 'Biodata Siswa', component: BiodataSiswaLengkapForm },
  { id: 4, step_order: 4, code: 'BIODATA_FATHER', label: 'Biodata Ayah', component: ComingSoonStep },
  { id: 5, step_order: 5, code: 'BIODATA_MOTHER', label: 'Biodata Ibu', component: ComingSoonStep },
  { id: 6, step_order: 6, code: 'BIODATA_WALI', label: 'Biodata Wali', component: ComingSoonStep },
  { id: 7, step_order: 7, code: 'DOCUMENT_KK', label: 'Dokumen KK', component: ComingSoonStep },
  { id: 8, step_order: 8, code: 'DOCUMENT_KTP', label: 'Dokumen KTP', component: ComingSoonStep },
  { id: 9, step_order: 9, code: 'DOCUMENT_AKTE', label: 'Dokumen AKTE', component: ComingSoonStep },
  { id: 10, step_order: 10, code: 'FINALIZATION', label: 'Finalisasi', component: ComingSoonStep },
];