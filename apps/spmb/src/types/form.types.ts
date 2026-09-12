import { MasterData } from "@bn/types";
import type { BiodataSiswa, FormPendaftaran, MasterStep, MasterLembaga, MasterKelas } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: MasterData[];
  kelas: MasterData[];
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

export type InitFormStepDataRPCResponse = Pick<BiodataSiswa, 'nama_lengkap' | 'nik' | 'jenis_kelamin' | 'tempat_lahir' | 'tanggal_lahir'> & {
  lembaga_tujuan: string;
  kelas: string | null;
}

export interface ProcessFormInput {
  formId: string;
  payload: Record<string, FormDataEntryValue>;
}

export interface ProcessDocumentUpload {
  formId: string;
  filePath: string;
}
