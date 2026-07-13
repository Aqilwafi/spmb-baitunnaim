import { MasterData } from "@bn/types";
export const checkIsMI = (selectedId: number | undefined): boolean => {
  return selectedId === 1;
};

export const isClassFieldLocked = (
  selectedLembagaId: number | undefined,
  isMI: boolean
): boolean => {
  return !selectedLembagaId || !isMI;
};
