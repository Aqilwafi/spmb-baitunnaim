import { MasterData } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: MasterData[];
  kelas: MasterData[];
}

export interface InitFormPendaftaranProps extends InitFormPendaftaranModalProps { 
  selectedLembagaId: number | undefined;
  onLembagaChange: (id: number) => void;
}