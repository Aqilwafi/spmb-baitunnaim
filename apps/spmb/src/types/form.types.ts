import { MasterData, BaseDocumentPayload, EnumGender, Pembayaran } from "@bn/types";
import type { BiodataSiswa, FormPendaftaran, MasterStep, MasterLembaga, MasterKelas, Dokumen} from "@bn/types";


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

export interface DetailPendaftaran {
  id: FormPendaftaran['id'];
  stepId: FormPendaftaran['step_id'];
}

export interface InitFormStepData {
  namaLengkap: BiodataSiswa['nama_lengkap'];
  nik: BiodataSiswa['nik'];
  gender: EnumGender;
  tempatLahir: BiodataSiswa['tempat_lahir'];
  tanggalLahir: BiodataSiswa['tanggal_lahir'];
  lembagaTujuan: MasterLembaga['label'];
  kelas: MasterKelas['label'] | null;
}

export interface PembayaranStepData {
  urlBuktiBayar: Pembayaran['bukti_pembayaran_url'];
  paymentStatus: Pembayaran['payment_status'];
  uploadedAt: Pembayaran['created_at'];
  verifiedAt: Pembayaran['verified_at'];
  verifiedBy: string | null;
}

export interface DokumenStepData {
  id: Dokumen['id'];
  formPendaftaranId: Dokumen['form_pendaftaran_id'];
  tipeDokumenId: Dokumen['tipe_dokumen_id'];
  fileUrl: Dokumen['file_url'];
  documentStatus: Dokumen['document_status'];
  catatanVerifikasi: Dokumen['catatan_verifikasi'];
  verifiedAt: Dokumen['verified_at'];
  uploadedAt: Dokumen['uploaded_at'];
  verifiedBy: string | null;
}

export interface FormSubmitResult {
  success: boolean;
  formId: string;
  nextStepId?: number;
}

export interface BaseFormPayload {
  payload: Record<string, FormDataEntryValue>;
}

export interface ProcessFormPayload extends BaseFormPayload {
  formId: FormPendaftaran['id'];
} 

export interface ProcessDocumentPayload extends BaseDocumentPayload {
  formId: FormPendaftaran['id'];
}

interface ProcessDetailDocumentPayload extends ProcessDocumentPayload {
    documentType: string;
}




