// packages/utils/src/mappers.ts (atau lokasi yang sesuai)

import type { MasterData } from '@bn/types';
import type {
  MasterStepListItem,
  MasterTahunAjaranListItem,
} from '@bn/types';

type BasicMasterListItem = {
  id: number;
  code: string;
  label: string | null;
};

// Generic — dipakai untuk 6 master data dengan shape { id, code, label }
export function mapToMasterData<T extends BasicMasterListItem>(data: T[]): MasterData[] {
  return data.map((item) => ({
    value: item.id,
    label: item.label ?? item.code,
  }));
}

// Override — Step punya field tambahan `order`
export function mapStepOptions(data: MasterStepListItem[]): MasterData[] {
  return data.map((step) => ({
    value: step.id,
    label: step.label ?? step.code,
    order: step.step_order,
  }));
}

// Override — TahunAjaran gak punya `label`, dan punya `semester`
export function mapTahunAjaranOptions(data: MasterTahunAjaranListItem[]): MasterData[] {
  return data.map((item) => ({
    value: item.id,
    label: `${item.semester} (${item.start_year}/${item.end_year})`,
    start_year: item.start_year,
    end_year: item.end_year,
    semester: item.semester,
  }));
}