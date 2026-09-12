import { MasterData } from "@bn/types";
import type { BiodataSiswa, FormPendaftaran, MasterStep, MasterLembaga, MasterKelas } from "@bn/types";

export interface InitFormPendaftaranModalProps {
  lembaga: MasterData[];
  kelas: MasterData[];
}

export interface FormCardsData {
  id: FormPendaftaran['id'];
  namaLengkap: BiodataSiswa['nama_lengkap'];
  lembagaLabel: MasterLembaga['label'];
  kelasLabel: MasterKelas['label'];
  stepLabel: MasterStep['label'];
  registrationStatus: FormPendaftaran['registration_status'];
  admissionStatus: FormPendaftaran['admission_status'];
  updatedAt: FormPendaftaran['updated_at'];
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
