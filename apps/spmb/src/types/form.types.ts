import { MasterData } from "@bn/types";
import type { BiodataSiswa, FormPendaftaran, MasterStep, MasterLembaga, MasterKelas } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: MasterData[];
  kelas: MasterData[];
}

export interface InitFormPendaftaranProps extends InitFormPendaftaranModalProps { 
  selectedLembagaId: number | undefined;
  onLembagaChange: (id: number) => void;
}

export interface FormCardsData {
  id: FormPendaftaran['id'];
  nama_lengkap: BiodataSiswa['nama_lengkap'];
  lembaga_label: MasterLembaga['label'];
  kelas_label: MasterKelas['label'];
  step_label: MasterStep['label'];
  registration_status: FormPendaftaran['registration_status'];
  admission_status: FormPendaftaran['admission_status'];
  updated_at: FormPendaftaran['updated_at'];
}