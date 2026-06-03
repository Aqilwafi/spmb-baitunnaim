// services/masterService.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { MasterKelas, MasterLembaga, MasterStatusRumah, MasterTipeDokumen, MasterTahunAjaran, MasterTinggalBersama, MasterRole, MasterDomains } from "@bn/types";

export async function getMasterKelas(): Promise<MasterKelas[]> {

    const supabase = await createSupabaseServer();
    const { data: masterKelas, error } = await supabase
        .from('master_kelas')
        .select('*');

    if (error) {
        throw new Error(`Gagal mengambil data master kelas: ${error.message}`);
    }
    return masterKelas || [];
}

export async function getMasterLembaga (): Promise<MasterLembaga[]> {
    const supabase = await createSupabaseServer();
    const { data: masterLembaga, error } = await supabase
        .from('master_lembaga')
        .select('*');
        
    if (error) throw new Error("Gagal mengambil data master lembaga");
    return masterLembaga || [];
}

export async function getMasterTahunAjaran (): Promise<MasterTahunAjaran> {
    const supabase = await createSupabaseServer();
    const { data: masterTahunAjaran, error } = await supabase
        .from('master_tahun_ajaran')
        .select('*')
        .eq('is_active', true)
        .single();
    if (error) throw new Error("Gagal mengambil data master tahun ajaran");
    return masterTahunAjaran;
}

export async function getMasterStatusRumah (): Promise<MasterStatusRumah[]> {
    const supabase = await createSupabaseServer();
    const { data: masterStatusRumah, error } = await supabase
        .from('master_status_rumah')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master status rumah");
    return masterStatusRumah || [];
}

export async function getMasterTinggalBersama (): Promise<MasterTinggalBersama[]> {
    const supabase = await createSupabaseServer();
    const { data: masterTinggalBersama, error } = await supabase
        .from('master_tinggal_bersama')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tinggal bersama");
    return masterTinggalBersama || [];
}

export async function getMasterTipeDokumen (): Promise<MasterTipeDokumen[]> {
    const supabase = await createSupabaseServer();
    const { data: masterTipeDokumen, error } = await supabase
        .from('master_tipe_dokumen')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tipe dokumen");
    return masterTipeDokumen || [];
}

export async function getMasterRoles (): Promise<MasterRole[]> {
    const supabase = await createSupabaseServer();
    const { data: masterRoles, error } = await supabase
        .from('master_roles')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master roles");
    return masterRoles || [];
}

export async function getMasterDomains (): Promise<MasterDomains[]> {
    const supabase = await createSupabaseServer();
    const { data: masterDomains, error } = await supabase
        .from('master_domains')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master domains");
    return masterDomains || [];
}