// packages/utils/src/mappers.ts
import { MasterStepListItem, SelectOption } from "@bn/types";

// export function mapFormPendaftaran(
//   raw: FormPendaftaranListItem[],
//   kelasOptions: SelectOption[],
//   lembagaOptions: SelectOption[],
//   stepList: MasterStepListItem[],
// ): FormPendaftaranMapItem[] {
//   return raw.map((form) => ({
//     ...form,
//     kelas: kelasOptions.find((o) => o.value === form.master_kelas_code)?.label ?? '-',
//     lembaga: lembagaOptions.find((o) => o.value === form.master_lembaga_code)?.label ?? '-',
//     last_step: stepList.find((s) => s.id === form.master_step_id)?.label ?? '-',
//   }));
// }

export function mapStepOptions(data: MasterStepListItem[]): SelectOption[] {
  return data.map((item) => ({
    value: item.code,
    label: item.label ?? item.code,
  }));
}