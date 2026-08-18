import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';
import type { BiodataSiswa } from './biodata-core.types';

export type FormPendaftaran = Tables<'form_pendaftaran'>;
export type FormPendaftaranInsert = TablesInsert<'form_pendaftaran'>;
export type FormPendaftaranUpdate = TablesUpdate<'form_pendaftaran'>;

export type Pembayaran = Tables<'pembayaran'>;
export type PembayaranInsert = TablesInsert<'pembayaran'>;
export type PembayaranUpdate = TablesUpdate<'pembayaran'>;

export type Dokumen = Tables<'dokumen'>;
export type DokumenInsert = TablesInsert<'dokumen'>;
export type DokumenUpdate = TablesUpdate<'dokumen'>;

// additionnal custom types per-components
export type InitFormPendaftaran = Pick<FormPendaftaran, 'biodata_siswa_id'> 
export type FormPendaftaranDisplayItem = FormPendaftaran & 
  Pick<BiodataSiswa, 'nik' | 'nama_lengkap' | 'jenis_kelamin' | 'lembaga_id' | 'kelas_id' > ;