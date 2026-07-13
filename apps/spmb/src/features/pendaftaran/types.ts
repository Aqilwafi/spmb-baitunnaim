import { MasterData } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: MasterData[];
  kelas: MasterData[];
}

export interface InitFormPendaftaranProps extends InitFormPendaftaranModalProps { 
  selectedLembagaCode: string;
  onLembagaChange: (code: string) => void;
}