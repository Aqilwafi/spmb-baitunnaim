// packages/services/src/pendaftaran/form.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { FormPendaftaran } from "@bn/types";

// ambil semua form untuk admin
export async function getFormPendaftaran(): Promise<FormPendaftaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('*')
    .is('deleted_at', null);

  if (error) return [];

  return data;
}

// ambil semua form untuk pendaftar berdasarkan tahun ajaran
export async function getFormPendaftaranBySiswaIdsAndTahunAjaranId(siswaIds: string[], tahunAjaranId: number): Promise<FormPendaftaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('*')
    .is('deleted_at', null)
    .in('biodata_siswa_id', siswaIds)
    .eq('tahun_ajaran_id', tahunAjaranId);

  if (error) return [];

  return data;
}

export async function getFormPendaftaranByPendaftarIdAndTahunAjaranId(pendaftarId: string, tahunAjaranId: number): Promise<FormPendaftaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('*')
    .is('deleted_at', null)
    .eq('pendaftar_id', pendaftarId)
    .eq('tahun_ajaran_id', tahunAjaranId);

  if (error) return [];

  return data;
}

export async function getFormPendaftaranByTahunAjaranId(tahunAjaranId: number): Promise<FormPendaftaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('*')
    .is('deleted_at', null)
    .eq('tahun_ajaran_id', tahunAjaranId);

  if (error) return [];

  return data;
}

export async function getFormPendaftaranByPendaftarId(pendaftarId: string): Promise<FormPendaftaran[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select('*')
    .is('deleted_at', null)
    .eq('pendaftar_id', pendaftarId);

  if (error) return [];

  return data;
}