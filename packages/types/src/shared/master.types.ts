import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from './base.types'

export type MasterKelas = Tables<'master_kelas'>;
export type MasterKelasInsert = TablesInsert<'master_kelas'>;
export type MasterKelasUpdate = TablesUpdate<'master_kelas'>;

export type MasterLembaga = Tables<'master_lembaga'>;
export type MasterLembagaInsert = TablesInsert<'master_lembaga'>;
export type MasterLembagaUpdate = TablesUpdate<'master_lembaga'>;

export type MasterTahunAjaran = Tables<'master_tahun_ajaran'>;
export type MasterTahunAjaranInsert = TablesInsert<'master_tahun_ajaran'>;
export type MasterTahunAjaranUpdate = TablesUpdate<'master_tahun_ajaran'>;

export type MasterStatusRumah = Tables<'master_status_rumah'>;
export type MasterStatusRumahInsert = TablesInsert<'master_status_rumah'>;
export type MasterStatusRumahUpdate = TablesUpdate<'master_status_rumah'>;

export type MasterTinggalBersama = Tables<'master_tinggal_bersama'>;
export type MasterTinggalBersamaInsert = TablesInsert<'master_tinggal_bersama'>;
export type MasterTinggalBersamaUpdate = TablesUpdate<'master_tinggal_bersama'>;

export type MasterTipeDokumen = Tables<'master_tipe_dokumen'>;
export type MasterTipeDokumenInsert = TablesInsert<'master_tipe_dokumen'>;
export type MasterTipeDokumenUpdate = TablesUpdate<'master_tipe_dokumen'>;

export type MasterStep = Tables<'master_step'>;
export type MasterStepInsert = TablesInsert<'master_step'>;
export type MasterStepUpdate = TablesUpdate<'master_step'>;

export type MasterRoles = Tables<'master_roles'>;
export type MasterRolesInsert = TablesInsert<'master_roles'>;
export type MasterRolesUpdate = TablesUpdate<'master_roles'>;

export type MasterDomains = Tables<'master_domains'>;
export type MasterDomainsInsert = TablesInsert<'master_domains'>;
export type MasterDomainsUpdate = TablesUpdate<'master_domains'>;
