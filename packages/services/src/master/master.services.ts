// @bn/services/src/master/masterService.ts

import "server-only";
import { MasterKelasListItem, MasterLembagaListItem, MasterStatusRumahListItem, MasterStepListItem, MasterTahunAjaranListItem, MasterTinggalBersamaListItem, MasterTipeDokumenListItem } from "@bn/types";
import { getCachedMasterData } from "./hof";

export const getMasterStep = () =>
  getCachedMasterData<MasterStepListItem[], 'master_step'>(
    "master_step",
    "id, code, label, step_order",
    (q) => q.eq("is_active", true)
  );

export const getMasterKelas = () =>
  getCachedMasterData<MasterKelasListItem[], 'master_kelas'>(
    "master_kelas",
    "id, code, label"
  );

export const getMasterLembaga = () =>
  getCachedMasterData<MasterLembagaListItem[], 'master_lembaga'>(
    "master_lembaga",
    "id, code, label"
  );

export const getMasterTahunAjaran = () =>
  getCachedMasterData<MasterTahunAjaranListItem | null, 'master_tahun_ajaran'>(
    "master_tahun_ajaran",
    "id, code, semester, start_year, end_year",
    (q) => q.eq("is_active", true).maybeSingle() // extraLogic
  );

export const getMasterStatusRumah = () =>
  getCachedMasterData<MasterStatusRumahListItem[], 'master_status_rumah'>(
    "master_status_rumah",
    "id, code, label"
  );

export const getMasterTinggalBersama = () =>
  getCachedMasterData<MasterTinggalBersamaListItem[], 'master_tinggal_bersama'>(
    "master_tinggal_bersama",
    "id, code, label"
  );

export const getMasterTipeDokumen = () =>
  getCachedMasterData<MasterTipeDokumenListItem[], 'master_tipe_dokumen'>(
    "master_tipe_dokumen",
    "id, code, label"
  );