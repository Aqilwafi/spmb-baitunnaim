import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';
import type { BiodataSiswaListItem } from './siswa-core.types';

export type FormPendaftaran = Tables<'form_pendaftaran'>;
export type FormPendaftaranInsert = TablesInsert<'form_pendaftaran'>;
export type FormPendaftaranUpdate = TablesUpdate<'form_pendaftaran'>;
export type FormPendaftaranListItem = Pick<FormPendaftaran, 'id' | 'biodata_siswa_id' | 'updated_at' | 'step_id' | 'registration_status' | 'admission_status' >;

export type Pembayaran = Tables<'pembayaran'>;
export type PembayaranInsert = TablesInsert<'pembayaran'>;
export type PembayaranUpdate = TablesUpdate<'pembayaran'>;
export type PembayaranListItem = Pick<Pembayaran, 'id' >;

export type Dokumen = Tables<'dokumen'>;
export type DokumenInsert = TablesInsert<'dokumen'>;
export type DokumenUpdate = TablesUpdate<'dokumen'>;
export type DokumenListItem = Pick<Dokumen, 'id' >;

export type InitFormPendaftaran = Pick<FormPendaftaranListItem, 'biodata_siswa_id'> 

export type FormPendaftaranDisplayItem = FormPendaftaranListItem & Omit<BiodataSiswaListItem, 'id'>;