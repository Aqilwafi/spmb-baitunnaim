// packages/utils/src/mappers.ts (atau lokasi yang sesuai)

import type { MasterData, EnumStatusAdmisi, MasterStep, MasterTahunAjaran, BiodataKeluarga } from '@bn/types';;

type BasicMasterItem = {
  id: number;
  code: string;
  label: string | null;
};

// Generic — dipakai untuk 6 master data dengan shape { id, code, label }
export function mapToMasterData<T extends BasicMasterItem>(data: T[]): MasterData[] {
  return data.map((item) => ({
    value: item.id,
    label: item.label ?? item.code,
  }));
}

// Override — Step punya field tambahan `order`
export function mapStepOptions(data: MasterStep[]): MasterData[] {
  return data.map((step) => ({
    value: step.id,
    id: step.id,
    label: step.label,
    order: step.step_order,
    code: step.code,
  }));
}

// Override — TahunAjaran gak punya `label`, dan punya `semester`
export function mapTahunAjaranAktif(item: MasterTahunAjaran): MasterData {
  return {
    value: item.id,
    id: item.id,
    label: `${item.semester} (${item.start_year}/${item.end_year})`,
    startYear: item.start_year,
    endYear: item.end_year,
    semester: item.semester,
  };
}

const GENDER_MAP: Record<string, 'MALE' | 'FEMALE'> = {
  '1': 'MALE',
  '2': 'FEMALE',
};

export function mapGenderCode(value: FormDataEntryValue | undefined): 'MALE' | 'FEMALE' | undefined {
  if (typeof value !== 'string') return undefined;
  return GENDER_MAP[value];
}

const GENDER_LABEL: Record<'MALE' | 'FEMALE' | 'OTHER', string> = {
  MALE: 'Laki-laki',
  FEMALE: 'Perempuan',
  OTHER: 'Lainnya',
};

export function genderLabel(value: 'MALE' | 'FEMALE' | 'OTHER'): string {
  return GENDER_LABEL[value];
}

// utils/lookup-label.ts (atau taruh di file mappers.ts yang sudah ada)


/**
 * Generic lookup: cari satu item dari array master data berdasarkan id,
 * kembalikan label-nya saja (fallback ke code kalau label null, atau "-" kalau tidak ketemu).
 * Cocok dipakai saat sudah punya array master data di memory (hasil getXxxOptions),
 * tidak perlu fetch/query baru per item.
 */
export function lookupLabelById<T extends BasicMasterItem>(
  data: T[],
  id: number | null | undefined
): string {
  if (id == null) return "-";
  const found = data.find((item) => item.id === id);
  return found?.label ?? found?.code ?? "-";
}

const ADMISSION_STATUS_LABEL: Record<EnumStatusAdmisi, string> = {
  PROCESS: "Sedang Diproses",
  AWAITING: "Masuk Antrean",
  ACCEPTED: "Diterima",
  REJECTED: "Ditolak",
};

export function admissionStatusLabel(value: EnumStatusAdmisi | null | undefined): string {
  if (!value) return "-";
  return ADMISSION_STATUS_LABEL[value] ?? value;
}

// utils/badge-helper.ts

export function getStatusHidupBadgeClass(status?: BiodataKeluarga['status_hidup']): string {
    switch (status?.toUpperCase()) {
        case "HIDUP":
            // Biru
            return "bg-green-50 text-green-700 border-green-200";
        case "MENINGGAL":
            // Merah
            return "bg-red-50 text-red-700 border-red-200";
        case "LAINNYA":
        default:
            // Kuning
            return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
}