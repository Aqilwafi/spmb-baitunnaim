import { MasterData } from "@/types/typeApplication";

/**
 * Mengecek apakah lembaga yang dipilih adalah MI (Madrasah Ibtidaiyah)
 */
export const checkIsMI = (selectedId: string, masterLembaga: MasterData[]): boolean => {
  if (!selectedId) return false;
  const selected = masterLembaga.find(l => l.id.toString() === selectedId);
  return selected?.name.toUpperCase() === "MI";
};

/**
 * Menentukan apakah input kelas harus dikunci atau tidak
 */
export const isClassFieldLocked = (selectedLembagaId: string, isMI: boolean): boolean => {
  return !selectedLembagaId || !isMI;
};