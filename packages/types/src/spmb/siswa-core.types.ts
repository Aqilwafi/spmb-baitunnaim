import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

export type BiodataSiswa = Tables<'biodata_siswa'>;
export type BiodataSiswaInsert = TablesInsert<'biodata_siswa'>;
export type BiodataSiswaUpdate = TablesUpdate<'biodata_siswa'>;
export type BiodataSiswaListItem = Pick<BiodataSiswa, 'id' | 'nik' | 'nama_lengkap' | 'jenis_kelamin' | 'lembaga_id' | 'kelas_id' >;

export type BiodataSiswaDetail = Tables<'biodata_siswa_detail'>;
export type BiodataSiswaDetailInsert = TablesInsert<'biodata_siswa_detail'>;
export type BiodataSiswaDetailUpdate = TablesUpdate<'biodata_siswa_detail'>;
export type BiodataSiswaDetailListItem = Pick<BiodataSiswaDetail, 'id' | 'no_kk' | 'status_rumah_id' | 'tinggal_bersama_id' | 'anak_ke' | 'jumlah_saudara' | 'agama' | 'alamat' >;

export type BiodataKeluarga = Tables<'biodata_keluarga'>;
export type BiodataKeluargaInsert = TablesInsert<'biodata_keluarga'>;
export type BiodataKeluargaUpdate = TablesUpdate<'biodata_keluarga'>;
export type BiodataKeluargaListItem = Pick<BiodataKeluarga, 'id' >;

export type PendidikanSiswaSebelumnya = Tables<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaInsert = TablesInsert<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaUpdate = TablesUpdate<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaListItem = Pick<PendidikanSiswaSebelumnya, 'id' >;