import { SelectOption } from "@bn/types";

export const mapLembagaOptions = (data: SelectOption[]) =>
  data.map(item => ({
    code: item.code,
    label: item.label ?? item.code,
  }));

export const mapKelasOptions = (data: SelectOption[]) =>
  data
    .filter(k => k.code)
    .map(item => ({
      code: String(item.code),
      label: item.label ?? item.code,
    }));