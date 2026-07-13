import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from './supabase';

export type MasterStepRow = Tables<'master_step'>;
export type MasterStepInsert = TablesInsert<'master_step'>;
export type MasterStepUpdate = TablesUpdate<'master_step'>;
export type MasterStepListItem = Pick<MasterStepRow, 'id' | 'code' | 'label' | 'step_order' >;

export type MasterKelasRow = Tables<'master_kelas'>;
export type MasterKelasInsert = TablesInsert<'master_kelas'>;
export type MasterKelasUpdate = TablesUpdate<'master_kelas'>;
export type MasterKelasListItem = Pick<MasterKelasRow, 'id' | 'code' | 'label'>;

export type MasterLembagaRow = Tables<'master_lembaga'>;
export type MasterLembagaInsert = TablesInsert<'master_lembaga'>;
export type MasterLembagaUpdate = TablesUpdate<'master_lembaga'>;
export type MasterLembagaListItem = Pick<MasterLembagaRow, 'id' | 'code' | 'label'>;

export type MasterTahunAjaranRow = Tables<'master_tahun_ajaran'>;
export type MasterTahunAjaranInsert = TablesInsert<'master_tahun_ajaran'>;
export type MasterTahunAjaranUpdate = TablesUpdate<'master_tahun_ajaran'>;
export type MasterTahunAjaranListItem = Pick<MasterTahunAjaranRow, 'id'| 'semester' | 'code' | 'start_year' | 'end_year' >;

export type MasterStatusRumahRow = Tables<'master_status_rumah'>;
export type MasterStatusRumahInsert = TablesInsert<'master_status_rumah'>;
export type MasterStatusRumahUpdate = TablesUpdate<'master_status_rumah'>;
export type MasterStatusRumahListItem = Pick<MasterStatusRumahRow, 'id' | 'code' | 'label'>;

export type MasterTinggalBersamaRow = Tables<'master_tinggal_bersama'>;
export type MasterTinggalBersamaInsert = TablesInsert<'master_tinggal_bersama'>;
export type MasterTinggalBersamaUpdate = TablesUpdate<'master_tinggal_bersama'>;
export type MasterTinggalBersamaListItem = Pick<MasterTinggalBersamaRow, 'id' | 'code' | 'label'>;

export type MasterTipeDokumenRow = Tables<'master_tipe_dokumen'>;
export type MasterTipeDokumenInsert = TablesInsert<'master_tipe_dokumen'>;
export type MasterTipeDokumenUpdate = TablesUpdate<'master_tipe_dokumen'>;
export type MasterTipeDokumenListItem = Pick<MasterTipeDokumenRow, 'id' | 'code' | 'label'>;

export type MasterRolesRow = Tables<'master_roles'>;
export type MasterRolesInsert = TablesInsert<'master_roles'>;
export type MasterRolesUpdate = TablesUpdate<'master_roles'>;
export type MasterRolesListItem = Pick<MasterRolesRow, 'id' | 'code' | 'label'>;