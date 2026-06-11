import { SelectOption, MasterKelasListItem, MasterLembagaListItem } from "@bn/types";

export function mapLembagaOptions(data: MasterLembagaListItem[]): SelectOption[] {

  return data.map(item => ({
    value: item.code,
    label: item.label ?? item.code,
  }));
}

export function mapKelasOptions(data: MasterKelasListItem[]): SelectOption[] {

  return data.map(item => ({
    value: item.code,
    label: item.label ?? item.code,
  }));
}

