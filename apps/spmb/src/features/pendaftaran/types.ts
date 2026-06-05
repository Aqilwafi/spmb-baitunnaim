import { SelectOption } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: SelectOption[];
  kelas: SelectOption[];
}

export interface InitFormPendaftaranProps extends InitFormPendaftaranModalProps { 
  selectedLembagaCode: string;
  onLembagaChange: (code: string) => void;
}