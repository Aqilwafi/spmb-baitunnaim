import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/base.types';

export type Siswa = Tables<'biodata_siswa'>;
export type SiswaInsert = TablesInsert<'biodata_siswa'>;
export type SiswaUpdate = TablesUpdate<'biodata_siswa'>;