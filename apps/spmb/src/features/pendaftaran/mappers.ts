import { SelectOption, MasterKelas, MasterLembaga } from "@bn/types";

export function mapLembagaOptions(data: MasterLembaga[]): SelectOption[] {

  return data.map(item => ({
    value: item.code,
    label: item.label ?? item.code,
  }));
}

export function mapKelasOptions(data: MasterKelas[]): SelectOption[] {

  return data
    .filter((k) => k.code)
    .map((item) => ({
      value: String(item.code),
      label: item.label ?? item.code,
    }));
}