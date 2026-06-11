import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from './base.types';

export type MasterStepRow = Tables<'master_step'>;
export type MasterStepInsert = TablesInsert<'master_step'>;
export type MasterStepUpdate = TablesUpdate<'master_step'>;
export type MasterStepListItem = Pick<MasterStepRow, 'id'| 'code' | 'label' | 'sort_order' | 'is_revisable'>;

export type MasterKelasRow = Tables<'master_kelas'>;
export type MasterKelasInsert = TablesInsert<'master_kelas'>;
export type MasterKelasUpdate = TablesUpdate<'master_kelas'>;
export type MasterKelasListItem = Pick<MasterKelasRow, 'code' | 'label'>;

export type MasterLembagaRow = Tables<'master_lembaga'>;
export type MasterLembagaInsert = TablesInsert<'master_lembaga'>;
export type MasterLembagaUpdate = TablesUpdate<'master_lembaga'>;
export type MasterLembagaListItem = Pick<MasterLembagaRow, 'code' | 'label'>;

export type MasterTahunAjaranRow = Tables<'master_tahun_ajaran'>;
export type MasterTahunAjaranInsert = TablesInsert<'master_tahun_ajaran'>;
export type MasterTahunAjaranUpdate = TablesUpdate<'master_tahun_ajaran'>;
export type MasterTahunAjaranListItem = Pick<MasterTahunAjaranRow, 'semester' | 'code' | 'tahun_mulai' | 'tahun_selesai' >;

export type MasterStatusRumahRow = Tables<'master_status_rumah'>;
export type MasterStatusRumahInsert = TablesInsert<'master_status_rumah'>;
export type MasterStatusRumahUpdate = TablesUpdate<'master_status_rumah'>;
export type MasterStatusRumahListItem = Pick<MasterStatusRumahRow, 'code' | 'label'>;

export type MasterTinggalBersamaRow = Tables<'master_tinggal_bersama'>;
export type MasterTinggalBersamaInsert = TablesInsert<'master_tinggal_bersama'>;
export type MasterTinggalBersamaUpdate = TablesUpdate<'master_tinggal_bersama'>;
export type MasterTinggalBersamaListItem = Pick<MasterTinggalBersamaRow, 'code' | 'label'>;

export type MasterTipeDokumenRow = Tables<'master_tipe_dokumen'>;
export type MasterTipeDokumenInsert = TablesInsert<'master_tipe_dokumen'>;
export type MasterTipeDokumenUpdate = TablesUpdate<'master_tipe_dokumen'>;
export type MasterTipeDokumenListItem = Pick<MasterTipeDokumenRow, 'code' | 'label'>;

export type MasterRolesRow = Tables<'master_roles'>;
export type MasterRolesInsert = TablesInsert<'master_roles'>;
export type MasterRolesUpdate = TablesUpdate<'master_roles'>;

export type MasterDomainsRow = Tables<'master_domains'>;
export type MasterDomainsInsert = TablesInsert<'master_domains'>;
export type MasterDomainsUpdate = TablesUpdate<'master_domains'>;
