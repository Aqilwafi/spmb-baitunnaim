import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/base.types'

export type TahunAjaranActive = {
  code: string;
  semester: string;
};

export type FormPendaftaran = Tables<'form_pendaftaran'>;
export type FormPendaftaranInsert = TablesInsert<'form_pendaftaran'>;
export type FormPendaftaranUpdate = TablesUpdate<'form_pendaftaran'>;