// packages/utils/src/mappers.ts (atau lokasi yang sesuai)

import type { MasterData } from '@bn/types';
import type {
  MasterStep,
  MasterTahunAjaran,
} from '@bn/types';

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
    label: step.label ?? step.code,
    order: step.step_order,
  }));
}

// Override — TahunAjaran gak punya `label`, dan punya `semester`
export function mapTahunAjaranOptions(data: MasterTahunAjaran[]): MasterData[] {
  return data.map((item) => ({
    value: item.id,
    label: `${item.semester} (${item.start_year}/${item.end_year})`,
    start_year: item.start_year,
    end_year: item.end_year,
    semester: item.semester,
  }));
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