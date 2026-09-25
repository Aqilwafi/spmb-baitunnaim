import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswa, BiodataKeluarga, BiodataSiswaDetail, MasterLembaga, MasterKelas} from "@bn/types";

export interface LaporanSiswaMapped {
  namaLengkap: BiodataSiswa['nama_lengkap'];
  nisn: BiodataSiswa['nisn'];
  nik: BiodataSiswa['nik'];
  tempatLahir: BiodataSiswa['tempat_lahir'];
  tanggalLahir: BiodataSiswa['tanggal_lahir'];
  lembaga: MasterLembaga['label'];
  kelas: MasterKelas['label'];
  jenisKelamin: BiodataSiswa['jenis_kelamin'];
  alamat: BiodataSiswaDetail['alamat'];
  noTelepon: BiodataKeluarga['no_hp'];
  kebutuhanKhusus: BiodataSiswa['catatan'];
  namaAyahKandung: BiodataKeluarga['nama_lengkap'];
  namaIbuKandung: BiodataKeluarga['nama_lengkap'];
  namaWali: BiodataKeluarga['nama_lengkap'];
}

export async function getExportSiswa(paths: string[]): Promise<string[]> {
  const supabase = await createSupabaseServer();

  // Jika array path kosong, langsung kembalikan array kosong
  if (!paths || paths.length === 0) return [];

  // Menggunakan createSignedUrls untuk mengambil URL dengan masa berlaku (misal: 60 detik)
  const { data, error } = await supabase
    .from('biodata_siswa')
    .select(`
        nama_lengkap,
        nisn,
        nik,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        catatan,
        master_lembaga (
        label
        ),
        master_kelas (
        label
        ),
        biodata_siswa_detail (
        alamat
        ),
        biodata_keluarga (
        nama_lengkap,
        relation_type,
        no_hp
        )
    `);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil return menjadi array of string (signedUrl)
  // Pastikan menyaring nilai yang signedUrl-nya tidak null
  return [];
}