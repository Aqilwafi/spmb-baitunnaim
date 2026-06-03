import { MasterLembaga } from "@bn/types";

/**
 * Mengecek apakah lembaga yang dipilih adalah MI (Madrasah Ibtidaiyah)
 */
export const checkIsMI = (selectedCode: string, masterLembaga: MasterLembaga[]): boolean => {
  if (!selectedCode) return false;
  const selected = masterLembaga.find((l) => l.code === selectedCode);
  return selected?.code.toUpperCase() === "MI";
};

/**
 * Menentukan apakah input kelas harus dikunci atau tidak
 */
export const isClassFieldLocked = (selectedLembagaCode: string, isMI: boolean): boolean => {
  return !selectedLembagaCode || !isMI;
};