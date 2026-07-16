// @/services/init-form.ts

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import type { InitFormInput } from "@bn/validators";

const INIT_CATATAN = "Init Form. NISN akan diisi saat biodata siswa.";

export async function upsertBiodataSiswa(pendaftarId: string, payload: InitFormInput) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('biodata_siswa')
    .upsert(
      {
        nik: payload.nik,
        nama_lengkap: payload.namaLengkap,
        jenis_kelamin: payload.gender,
        tempat_lahir: payload.tempatLahir,
        tanggal_lahir: payload.tanggalLahir.toISOString().split('T')[0],
        lembaga_id: payload.lembagaId,
        kelas_id: payload.kelasId ?? null,
        owner_user_id: pendaftarId,
        catatan: INIT_CATATAN,
      },
      { onConflict: 'nik' }
    )
    .select('id')
    .eq('owner_user_id', pendaftarId )
    .single();

  if (error) {
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