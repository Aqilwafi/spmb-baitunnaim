import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

export type BiodataSiswa = Tables<'biodata_siswa'>;
export type BiodataSiswaInsert = TablesInsert<'biodata_siswa'>;
export type BiodataSiswaUpdate = TablesUpdate<'biodata_siswa'>;
export type BiodataSiswaListItem = Pick<BiodataSiswa, 'id' | 'nik' | 'nama_lengkap' | 'jenis_kelamin' | 'lembaga_id' | 'kelas_id' | 'catatan' | 'nisn' | 'owner_user_id'>;

export type BiodataSiswaDetail = Tables<'biodata_siswa_detail'>;
export type BiodataSiswaDetailInsert = TablesInsert<'biodata_siswa_detail'>;
export type BiodataSiswaDetailUpdate = TablesUpdate<'biodata_siswa_detail'>;
export type BiodataSiswaDetailListItem = Pick<BiodataSiswaDetail, 'id' | 'no_kk' | 'status_rumah_id' | 'tinggal_bersama_id' | 'anak_ke' | 'jumlah_saudara' | 'agama' | 'alamat' >;

export type BiodataKeluarga = Tables<'biodata_keluarga'>;
export type BiodataKeluargaInsert = TablesInsert<'biodata_keluarga'>;
export type BiodataKeluargaUpdate = TablesUpdate<'biodata_keluarga'>;
export type BiodataKeluargaListItem = Pick<BiodataKeluarga, 'id' | 'nama_lengkap' 
  | 'nik' | 'status_hidup' | 'no_hp' | 'relation_type' | 'detail_relation_type' 
  | 'pekerjaan' | 'pendidikan_terakhir' | 'tanggal_lahir' | 'tempat_lahir' | 'alamat' 
  | 'updated_at' | 'biodata_siswa_id' >;

export type PendidikanSiswaSebelumnya = Tables<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaInsert = TablesInsert<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaUpdate = TablesUpdate<'pendidikan_siswa_sebelumnya'>;
export type PendidikanSiswaSebelumnyaListItem = Pick<PendidikanSiswaSebelumnya, 'id' | 'biodata_siswa_id' 
  | 'npsn' | 'alamat_sekolah' | 'nama_sekolah' | 'catatan' | 'updated_at' >;