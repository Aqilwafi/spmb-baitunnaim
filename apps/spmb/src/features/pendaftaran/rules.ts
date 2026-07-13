import { MasterData } from "@bn/types";

export const checkIsMI = (selectedId: number, masterLembaga: MasterData[]) => {
  if (!selectedId) return false;

  const selected = masterLembaga.find(l => l.value === selectedId);

  return selected?.value === 1;
};

export const isClassFieldLocked = (
  selectedLembagaId: string,
  isMI: boolean
) => {
  return !selectedLembagaId || !isMI;
};