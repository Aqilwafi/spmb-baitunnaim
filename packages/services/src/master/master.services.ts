// @bn/services/src/master/masterService.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import { MasterDomainsRow, MasterRolesRow, MasterKelasListItem, MasterLembagaListItem, MasterStatusRumahListItem, MasterStepListItem, MasterTahunAjaranListItem, MasterTinggalBersamaListItem, MasterTipeDokumenListItem } from "@bn/types";
import { getCachedMasterData } from "../utils/hof";

export const getMasterStep = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterStepListItem[], 'master_step' >(
    supabase,
    "master_step",
    "code, label, sort_order, is_revisable",
    "master_step",
    (q) => q.eq("is_active", true)
  );

export const getMasterKelas = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterKelasListItem[], 'master_kelas'>(
    supabase,
    "master_kelas",
    "code, label",
    "master_kelas"
  );

export const getMasterLembaga = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterLembagaListItem[], 'master_lembaga'>(
    supabase,
    "master_lembaga",
    "code, label",
    "master_lembaga"
  );

export const getMasterTahunAjaran = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTahunAjaranListItem | null, 'master_tahun_ajaran'>(
    supabase,
    "master_tahun_ajaran",
    "code, semester, tahun_mulai, tahun_selesai",
    "master_tahun_ajaran",
    (q) => q.eq("is_active", true).maybeSingle() // extraLogic
  );

export const getMasterStatusRumah = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterStatusRumahListItem[], 'master_status_rumah'>(
    supabase,
    "master_status_rumah",
    "code, label",
    "master_status_rumah"
  );

export const getMasterTinggalBersama = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTinggalBersamaListItem[], 'master_tinggal_bersama'>(
    supabase,
    "master_tinggal_bersama",
    "code, label",
    "master_tinggal_bersama"
  );

export const getMasterTipeDokumen = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTinggalBersamaListItem[], 'master_tipe_dokumen'>(
    supabase,
    "master_tipe_dokumen",
    "code, label",
    "master_tipe_dokumen"
  );
