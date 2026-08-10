// @/services/init-form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { InitFormInput } from "@bn/validators";

const INIT_CATATAN = "Init Form. NISN akan diisi saat biodata siswa.";

export async function upsertBiodataSiswa(pendaftarId: string, payload: InitFormInput) {
  const supabase = await createSupabaseServer();

  // 1. Cek dulu apakah NIK ini sudah pernah terdaftar (row manapun, siapapun ownernya)
  const { data: existing, error: checkError } = await supabase
    .from('biodata_siswa')
    .select('id, owner_user_id')
    .eq('nik', payload.nik)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Gagal memeriksa data NIK: ${checkError.message}`);
  }

  if (existing) {
    // NIK sudah terdaftar — baik milik sendiri maupun orang lain, TOLAK.
    // Tidak boleh ada pendaftaran baru untuk NIK yang sama.
    throw new Error(
      existing.owner_user_id === pendaftarId
        ? "NIK ini sudah pernah didaftarkan sebelumnya."
        : "NIK sudah terdaftar dalam sistem."
    );
  }

  // 2. Belum ada — insert baru (bukan upsert)
  const { data, error } = await supabase
    .from('biodata_siswa')
    .insert({
      nik: payload.nik,
      nama_lengkap: payload.namaLengkap,
      jenis_kelamin: payload.gender,
      tempat_lahir: payload.tempatLahir,
      tanggal_lahir: payload.tanggalLahir.toISOString().split('T')[0],
      lembaga_id: payload.lembagaId,
      kelas_id: payload.kelasId ?? null,
      owner_user_id: pendaftarId,
      catatan: INIT_CATATAN,
    })
    .select('id')
    .single();

  if (error) {
    // Jaga-jaga kalau ada race condition dan constraint unique NIK di DB kena
    if (error.code === '23505') {
      throw new Error("NIK sudah terdaftar dalam sistem.");
    }
    throw new Error(`Gagal menyimpan biodata siswa: ${error.message}`);
  }

  return data;
}

export async function insertFormPendaftaran(params: {
    pendaftarId: string;
    biodataSiswaId: string;
    tahunAjaranId: number;
    stepId: number;
}) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('form_pendaftaran')
    .insert({
        pendaftar_id: params.pendaftarId,
        biodata_siswa_id: params.biodataSiswaId,
        tahun_ajaran_id: params.tahunAjaranId,
        step_id: params.stepId,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Gagal membuat form pendaftaran: ${error.message}`);
  }

  return data;
}