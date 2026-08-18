// packages/services/src/master/master.services.ts
// @bn/services

import "server-only";
import { withCache } from "@bn/utils";
import { createSupabaseServer } from "@bn/supabase"; // sesuaikan path import supabase server client-mu
import {
  MasterCategories,
  MasterKelas,
  MasterLembaga,
  MasterStatusRumah,
  MasterStep,
  MasterTahunAjaran,
  MasterTinggalBersama,
  MasterTipeDokumen,
} from "@bn/types";

export const getMasterStep = () =>
  withCache<MasterStep[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("master_step")
        .select("*")
        .eq("is_active", true);
      if (error) throw new Error(error.message);
      return data as MasterStep[];
    },
    ["master_step"],
    ["master_step"]
  )();

export const getMasterKelas = () =>
  withCache<MasterKelas[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_kelas").select("*");
      if (error) throw new Error(error.message);
      return data as MasterKelas[];
    },
    ["master_kelas"],
    ["master_kelas"]
  )();

export const getMasterLembaga = () =>
  withCache<MasterLembaga[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_lembaga").select("*");
      if (error) throw new Error(error.message);
      return data as MasterLembaga[];
    },
    ["master_lembaga"],
    ["master_lembaga"]
  )();

export const getMasterTahunAjaran = () =>
  withCache<MasterTahunAjaran | null>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("master_tahun_ajaran")
        .select("*")
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data as MasterTahunAjaran | null;
    },
    ["master_tahun_ajaran"],
    ["master_tahun_ajaran"]
  )();

export const getMasterStatusRumah = () =>
  withCache<MasterStatusRumah[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_status_rumah").select("*");
      if (error) throw new Error(error.message);
      return data as MasterStatusRumah[];
    },
    ["master_status_rumah"],
    ["master_status_rumah"]
  )();

export const getMasterTinggalBersama = () =>
  withCache<MasterTinggalBersama[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_tinggal_bersama").select("*");
      if (error) throw new Error(error.message);
      return data as MasterTinggalBersama[];
    },
    ["master_tinggal_bersama"],
    ["master_tinggal_bersama"]
  )();

export const getMasterTipeDokumen = () =>
  withCache<MasterTipeDokumen[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_tipe_dokumen").select("*");
      if (error) throw new Error(error.message);
      return data as MasterTipeDokumen[];
    },
    ["master_tipe_dokumen"],
    ["master_tipe_dokumen"]
  )();

export const getMasterCategories = () =>
  withCache<MasterCategories[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase.from("master_categories").select("*");
      if (error) throw new Error(error.message);
      return data as MasterCategories[];
    },
    ["master_categories"],
    ["master_categories"]
  )();