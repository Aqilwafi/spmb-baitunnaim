// services/masterService.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { MasterKelas, MasterLembaga, MasterStatusRumah, MasterTipeDokumen, MasterTahunAjaran, MasterTinggalBersama, MasterRole, MasterDomains } from "@bn/types";

export async function getMasterKelas(userId: string): Promise<MasterKelas[]> {

    if (!userId) throw new Error("User ID tidak ditemukan. Pastikan pengguna sudah login.");

    const supabase = await createSupabaseServer();
    const { data: masterKelas, error } = await supabase
        .from('master_kelas')
        .select('*');

    if (error) {
  // 💡 Tambahkan log ini agar kelihatan penyakit aslinya di terminal:
  console.error("🚨 Detail Error Supabase:", {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint
  });
  
  throw new Error(`Gagal mengambil data master kelas: ${error.message}`);
}
    return masterKelas || [];
}

export async function getMasterLembaga (userId: string): Promise<MasterLembaga[]> {
    const supabase = await createSupabaseServer();
    const { data: masterLembaga, error } = await supabase
        .from('master_lembaga')
        .select('*');
        
    if (error) throw new Error("Gagal mengambil data master lembaga");
    return masterLembaga || [];
}

export async function getMasterTahunAjaran (userId: string): Promise<MasterTahunAjaran[]> {
    const supabase = await createSupabaseServer();
    const { data: masterTahunAjaran, error } = await supabase
        .from('master_tahun_ajaran')
        .select('*')
        .eq('is_active', true)
        .single();
    if (error) throw new Error("Gagal mengambil data master tahun ajaran");
    return masterTahunAjaran || [];
}

export async function getMasterStatusRumah (userId: string): Promise<MasterStatusRumah[]> {
    const supabase = await createSupabaseServer();
    const { data: masterStatusRumah, error } = await supabase
        .from('master_status_rumah')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master status rumah");
    return masterStatusRumah || [];
}

export async function getMasterTinggalBersama (userId: string): Promise<MasterTinggalBersama[]> {
    const supabase = await createSupabaseServer();
    const { data: masterTinggalBersama, error } = await supabase
        .from('master_tinggal_bersama')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tinggal bersama");
    return masterTinggalBersama || [];
}

export async function getMasterTipeDokumen (userId: string): Promise<MasterTipeDokumen[]> {
    const supabase = await createSupabaseServer();
    const { data: masterTipeDokumen, error } = await supabase
        .from('master_tipe_dokumen')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master tipe dokumen");
    return masterTipeDokumen || [];
}

export async function getMasterRoles (userId: string): Promise<MasterRole[]> {
    const supabase = await createSupabaseServer();
    const { data: masterRoles, error } = await supabase
        .from('master_roles')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master roles");
    return masterRoles || [];
}

export async function getMasterDomains (userId: string): Promise<MasterDomains[]> {
    const supabase = await createSupabaseServer();
    const { data: masterDomains, error } = await supabase
        .from('master_domains')
        .select('*');
    if (error) throw new Error("Gagal mengambil data master domains");
    return masterDomains || [];
}