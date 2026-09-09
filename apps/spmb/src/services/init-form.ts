// services/init-form.ts
import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { EnumGender, BaseRPCSubmitResponse } from "@bn/types";

// ==========================================
// 1. RAW TYPES (Internal Service Saja - snake_case)
// Tipe data murni yang sesuai dengan RPC/Database
// ==========================================

interface InitFormStepDataRPCResponse {
  nama_lengkap: string;
  nik: string;
  jenis_kelamin: EnumGender;
  tempat_lahir: string;
  tanggal_lahir: string;
  lembaga_tujuan: string | null;
  kelas: string | null;
}

// ==========================================
// 2. DOMAIN TYPES (Export ke Outside/Features - camelCase)
// Tipe data bersih yang dipakai oleh Feature & UI
// ==========================================
export interface InitFormPayload {
  nik: string;
  namaLengkap: string;
  gender: EnumGender;
  tempatLahir: string;
  tanggalLahir: string;
  lembagaId: number;
  kelasId: number | null;
}

export interface InitFormResult {
  formId: string;
  nextStepId?: number | null;
}

export interface InitFormStepData {
  namaLengkap: string;
  nik: string;
  gender: EnumGender;
  tempatLahir: string;
  tanggalLahir: string;
  lembagaTujuan: string | null;
  kelas: string | null;
}

// ==========================================
// 3. SERVICE FUNCTIONS
// Tempat konversi (camelCase <-> snake_case)
// ==========================================

export async function insertInitFormStep(params: InitFormPayload): Promise<InitFormResult> {
  const supabase = await createSupabaseServer();

  // Mapping dari camelCase (input Feature) ke snake_case (ke RPC)
  const { data, error } = await supabase.rpc("fn_rpc_submit_init_form", {
    p_nik: params.nik,
    p_nama_lengkap: params.namaLengkap,
    p_gender: params.gender,
    p_tempat_lahir: params.tempatLahir,
    p_tanggal_lahir: params.tanggalLahir,
    p_lembaga_id: params.lembagaId,
    p_kelas_id: params.kelasId ?? undefined,
  });

  if (error) throw error;

  const rawData = data as unknown as BaseRPCSubmitResponse;

  // Mapping balik response RPC ke camelCase
  return {
    formId: rawData.form_id,
    nextStepId: rawData?.next_step_id ?? null,
  };
}

export async function getInitFormStep(
  formId: string,
  tahunAjaranId: number
): Promise<InitFormStepData | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc("fn_rpc_get_init_form_step_data", {
      p_form_id: formId,
      p_tahun_ajaran_id: tahunAjaranId,
    })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const rawData = data as unknown as InitFormStepDataRPCResponse;

  // Mapping dari snake_case (RPC) ke camelCase (ke Feature)
  return {
    namaLengkap: rawData.nama_lengkap,
    nik: rawData.nik,
    gender: rawData.jenis_kelamin,
    tempatLahir: rawData.tempat_lahir,
    tanggalLahir: rawData.tanggal_lahir,
    lembagaTujuan: rawData.lembaga_tujuan,
    kelas: rawData.kelas,
  };
}