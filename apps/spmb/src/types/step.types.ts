// @/types/step.types.ts

import type { ComponentType } from 'react';
import { FormPendaftaran, BiodataSiswa } from '@bn/types';

export type StepStatus = 'locked' | 'active' | 'complete';

/**
 * Kontrak props yang WAJIB diterima setiap Step Container (Server Component).
 * Container bertanggung jawab fetch data sendiri (jika status === 'complete')
 * dan merender Client Form yang sesuai.
 */
export interface StepContainerProps {
  pendaftaran_id: string;
  user_id: string;
  siswa_id?: string;
  tahun_ajaran_id?: number;
  status: StepStatus;
  code: string;
}

/**
 * Hasil komputasi per step yang dikirim dari page.tsx (Server)
 * ke AccordionOrchestrator (Client). `node` sudah berupa React element
 * hasil render container di server — locked = null (tidak pernah dirender).
 */
export interface StepElement {
  id: number | null | undefined;
  step_order: number | null | undefined;
  label: string;
  status: StepStatus;
  node: React.ReactNode;
}

export interface DetailPendaftaran {
  namaLengkap: BiodataSiswa['nama_lengkap'];
  id: FormPendaftaran['id'];
  biodataSiswaId: FormPendaftaran['biodata_siswa_id'];
  stepId: FormPendaftaran['step_id'];
  admissionStatus: FormPendaftaran['admission_status'];
  pendaftarId: string;
}