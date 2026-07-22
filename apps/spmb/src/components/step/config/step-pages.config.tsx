// components/step/config/step-pages.config.tsx

import ComingSoonContainer from "@/components/step/containers/ComingSoonContainer";
import type { StepConfigItem } from "@/types/step.types";

export const STEP_CONFIG: StepConfigItem[] = [
  { id: 1,  step_order: 1,  code: "FORM",            label: "Buat Form",      container: ComingSoonContainer },
  { id: 2,  step_order: 2,  code: "PAYMENT",          label: "Pembayaran",     container: ComingSoonContainer },
  { id: 3,  step_order: 3,  code: "BIODATA_STUDENT",  label: "Biodata Siswa",  container: ComingSoonContainer },
  { id: 4,  step_order: 4,  code: "BIODATA_FATHER",   label: "Biodata Ayah",   container: ComingSoonContainer },
  { id: 5,  step_order: 5,  code: "BIODATA_MOTHER",   label: "Biodata Ibu",    container: ComingSoonContainer },
  { id: 6,  step_order: 6,  code: "BIODATA_WALI",     label: "Biodata Wali",   container: ComingSoonContainer },
  { id: 7,  step_order: 7,  code: "DOCUMENT_KK",      label: "Dokumen KK",     container: ComingSoonContainer },
  { id: 8,  step_order: 8,  code: "DOCUMENT_KTP",     label: "Dokumen KTP",    container: ComingSoonContainer },
  { id: 9,  step_order: 9,  code: "DOCUMENT_AKTE",    label: "Dokumen AKTE",   container: ComingSoonContainer },
  { id: 10, step_order: 10, code: "FINALIZATION",     label: "Finalisasi",     container: ComingSoonContainer },
];