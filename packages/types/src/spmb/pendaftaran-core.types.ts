import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/base.types'
import { Siswa } from './siswa-core.types';

export type TahunAjaranActive = {
  code: string;
  semester: string;
  tahun_mulai: number;
  tahun_selesai: number;
};

export type FormPendaftaran = Tables<'form_pendaftaran'>;
export type FormPendaftaranInsert = TablesInsert<'form_pendaftaran'>;
export type FormPendaftaranUpdate = TablesUpdate<'form_pendaftaran'>;
export type FormPendaftaranListItem = Pick<FormPendaftaran, 'id'  | 'master_kelas_code' | 'master_lembaga_code' | 'master_step_id' | 'updated_at' | 'status_keputusan_final_pendaftaran'>;
export type FormPendaftaranMapItem = Pick<FormPendaftaran,  'id' | 'updated_at' | 'status_keputusan_final_pendaftaran'> & {
  lembaga: string;
  kelas: string;
  last_step: string;
};

export type FormPendaftaranView = {
  id: string;
  namaSiswa: string;
  lembaga: string;
  kelas: string;
  lastStep: string;
  status: string;
  lastModified: string;
};