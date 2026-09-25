import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswa } from "@bn/types";

export interface ListSiswa {
    id: BiodataSiswa['id'];
    namaLengkap: BiodataSiswa['nama_lengkap'];
    nisn: BiodataSiswa['nisn'];
    nik: BiodataSiswa['nik'];
    lembagaId: BiodataSiswa['lembaga_id'];
    kelasId: BiodataSiswa['kelas_id'];
    jenisKelamin: BiodataSiswa['jenis_kelamin'];
    catatan: BiodataSiswa['catatan'];
}

export async function getListSiswa(): Promise<ListSiswa[]> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('biodata_siswa')
    .select(`
        id,
        nama_lengkap,
        nisn,
        nik,
        jenis_kelamin,
        kelas_id,
        lembaga_id,
        catatan
    `);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil query database (snake_case) ke interface ListSiswa (camelCase)
  return data.map((item) => ({
    id: item.id,
    namaLengkap: item.nama_lengkap,
    nisn: item.nisn,
    nik: item.nik,
    lembagaId: item.lembaga_id,
    kelasId: item.kelas_id,
    jenisKelamin: item.jenis_kelamin,
    catatan: item.catatan
  }));
}