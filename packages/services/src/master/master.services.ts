// @bn/services/src/master/masterService.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import { MasterRolesRow, MasterKelasListItem, MasterLembagaListItem, MasterStatusRumahListItem, MasterStepListItem, MasterTahunAjaranListItem, MasterTinggalBersamaListItem, MasterTipeDokumenListItem } from "@bn/types";
import { getCachedMasterData } from "../utils/hof";

export const getMasterStep = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterStepListItem[], 'master_step'>(
    supabase,
    "master_step",
    "id, code, label, step_order",
    (q) => q.eq("is_active", true)
  );

export const getMasterKelas = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterKelasListItem[], 'master_kelas'>(
    supabase,
    "master_kelas",
    "id, code, label"
  );

export const getMasterLembaga = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterLembagaListItem[], 'master_lembaga'>(
    supabase,
    "master_lembaga",
    "id, code, label"
  );

export const getMasterTahunAjaran = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTahunAjaranListItem | null, 'master_tahun_ajaran'>(
    supabase,
    "master_tahun_ajaran",
    "id, code, semester, start_year, end_year",
    (q) => q.eq("is_active", true).maybeSingle() // extraLogic
  );

export const getMasterStatusRumah = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterStatusRumahListItem[], 'master_status_rumah'>(
    supabase,
    "master_status_rumah",
    "id, code, label"
  );

export const getMasterTinggalBersama = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTinggalBersamaListItem[], 'master_tinggal_bersama'>(
    supabase,
    "master_tinggal_bersama",
    "id, code, label"
  );

// FIX: sebelumnya generic type-nya salah pakai MasterTinggalBersamaListItem
// (kemungkinan copy-paste dari fungsi di atasnya) — harusnya
// MasterTipeDokumenListItem, sesuai nama tabel & import yang sudah ada.
export const getMasterTipeDokumen = (supabase: AppSupabaseClient) =>
  getCachedMasterData<MasterTipeDokumenListItem[], 'master_tipe_dokumen'>(
    supabase,
    "master_tipe_dokumen",
    "id, code, label"
  );