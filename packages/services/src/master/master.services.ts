// @bn/services/src/master/masterService.ts

import "server-only";
import type { AppSupabaseClient } from "@bn/supabase";
import { MasterKelas, MasterLembaga, MasterStatusRumah, MasterTipeDokumen, MasterTahunAjaran, MasterTinggalBersama, MasterRole, MasterDomains } from "@bn/types";

export async function getMasterKelas(supabase: AppSupabaseClient): Promise<MasterKelas[]> {

  const { data: masterKelas, error } = await supabase
    .from("master_kelas")
    .select("*");

  if (error) {
    throw new Error(
      `Gagal mengambil data master kelas: ${error.message}`
    );
  }

  return masterKelas;
}

export async function getMasterLembaga (supabase: AppSupabaseClient): Promise<MasterLembaga[]> {
    const { data: masterLembaga, error } = await supabase
        .from('master_lembaga')
        .select('*');
        
    if (error) throw new Error("Gagal mengambil data master lembaga");
    return masterLembaga;
}

export async function getMasterTahunAjaran (supabase: AppSupabaseClient): Promise<MasterTahunAjaran | null> {
    const { data: masterTahunAjaran, error } = await supabase
        .from('master_tahun_ajaran')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
    if (error) throw new Error("Gagal mengambil data master tahun ajaran");
    return masterTahunAjaran;
}

export async function getMasterStatusRumah (supabase: AppSupabaseClient): Promise<MasterStatusRumah[]> {
    const { data: masterStatusRumah, error } = await supabase
        .from('master_status_rumah')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master status rumah");
    return masterStatusRumah || [];
}

export async function getMasterTinggalBersama (supabase: AppSupabaseClient): Promise<MasterTinggalBersama[]> {
    const { data: masterTinggalBersama, error } = await supabase
        .from('master_tinggal_bersama')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tinggal bersama");
    return masterTinggalBersama || [];
}

export async function getMasterTipeDokumen (supabase: AppSupabaseClient): Promise<MasterTipeDokumen[]> {
    const { data: masterTipeDokumen, error } = await supabase
        .from('master_tipe_dokumen')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tipe dokumen");
    return masterTipeDokumen;
}

export async function getMasterRoles (supabase: AppSupabaseClient): Promise<MasterRole[]> {
    const { data: masterRoles, error } = await supabase
        .from('master_roles')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master roles");
    return masterRoles;
}

export async function getMasterDomains (supabase: AppSupabaseClient): Promise<MasterDomains[]> {
    const { data: masterDomains, error } = await supabase
        .from('master_domains')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master domains");
    return masterDomains;
}