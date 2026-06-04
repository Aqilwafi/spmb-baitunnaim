import { SelectOption } from "@bn/types";

export const checkIsMI = (selectedCode: string, masterLembaga: SelectOption[]) => {
  if (!selectedCode) return false;

  const selected = masterLembaga.find(l => l.code === selectedCode);

  return selected?.code?.toUpperCase() === "MI";
};

export const isClassFieldLocked = (
  selectedLembagaCode: string,
  isMI: boolean
) => {
  return !selectedLembagaCode || !isMI;
};