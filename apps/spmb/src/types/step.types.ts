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
  status: StepStatus;
}

/**
 * Satu entri konfigurasi step dalam alur pendaftaran.
 * `container` menunjuk ke Server Component, BUKAN Client form langsung.
 */
export interface StepConfigItem {
  id: number;
  step_order: number;
  code: string;
  label: string;
  container: ComponentType<StepContainerProps>;
}

/**
 * Hasil komputasi per step yang dikirim dari page.tsx (Server)
 * ke AccordionOrchestrator (Client). `node` sudah berupa React element
 * hasil render container di server — locked = null (tidak pernah dirender).
 */
export interface StepElement {
  id: number;
  step_order: number;
  label: string;
  status: StepStatus;
  node: React.ReactNode;
}

export interface NamaSiswa {
  nama_lengkap: BiodataSiswa['nama_lengkap'];         
}

export interface FormPartial {
  id: FormPendaftaran['id'];
  biodata_siswa_id: FormPendaftaran['biodata_siswa_id'];              
  step_id: FormPendaftaran['step_id'];    
  admission_status: FormPendaftaran['admission_status'];  
}

export interface DetailPendaftaran extends NamaSiswa, FormPartial {
  pendaftar_id: string;
}