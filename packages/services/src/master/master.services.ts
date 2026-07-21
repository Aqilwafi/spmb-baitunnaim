// packages/services/src/master/master.services.ts
// @bn/services

import "server-only";
import { MasterCategories, MasterKelas, MasterLembaga, MasterStatusRumah, MasterStep, MasterTahunAjaran, MasterTinggalBersama, MasterTipeDokumen } from "@bn/types";
import { getCachedMasterData } from "./hof";

export const getMasterStep = () =>
  getCachedMasterData<MasterStep[], 'master_step'>(
    "master_step",
    "*",
    (q) => q.eq("is_active", true)
  );

export const getMasterKelas = () =>
  getCachedMasterData<MasterKelas[], 'master_kelas'>(
    "master_kelas",
    "*"
  );

export const getMasterLembaga = () =>
  getCachedMasterData<MasterLembaga[], 'master_lembaga'>(
    "master_lembaga",
    "*"
  );

export const getMasterTahunAjaran = () =>
  getCachedMasterData<MasterTahunAjaran | null, 'master_tahun_ajaran'>(
    "master_tahun_ajaran",
    "*",
    (q) => q.eq("is_active", true).maybeSingle()
  );

export const getMasterStatusRumah = () =>
  getCachedMasterData<MasterStatusRumah[], 'master_status_rumah'>(
    "master_status_rumah",
    "*"
  );

export const getMasterTinggalBersama = () =>
  getCachedMasterData<MasterTinggalBersama[], 'master_tinggal_bersama'>(
    "master_tinggal_bersama",
    "*"
  );

export const getMasterTipeDokumen = () =>
  getCachedMasterData<MasterTipeDokumen[], 'master_tipe_dokumen'>(
    "master_tipe_dokumen",
    "*"
  );

export const getMasterCategories = () =>
  getCachedMasterData<MasterCategories[], 'master_categories'>(
    "master_categories",
    "*"
  );