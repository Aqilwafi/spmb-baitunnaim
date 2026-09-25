import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswa, BiodataKeluarga } from "@bn/types";

export interface ListKeluarga {
    id: BiodataKeluarga['id'];
    namaLengkap: BiodataKeluarga['nama_lengkap'];
    statusHidup: BiodataKeluarga['status_hidup'];
    relasi: BiodataKeluarga['relation_type'];
    detailRelasi: BiodataKeluarga['detail_relation_type'];
    nik: BiodataKeluarga['nik'];
    nomorHp: BiodataKeluarga['no_hp'];
    tempatLahir: BiodataKeluarga['tempat_lahir'];
    tanggalLahir: BiodataKeluarga['tanggal_lahir'];
    penghasilan: BiodataKeluarga['penghasilan'];
    pekerjaan: BiodataKeluarga['pekerjaan'];
    pendidikanTerakhir: BiodataKeluarga['pendidikan_terakhir'];
    alamat: BiodataKeluarga['alamat'];
    updatedAt: BiodataKeluarga['updated_at'];
    siswaId: BiodataSiswa['id'];
    namaSiswa: BiodataSiswa['nama_lengkap'];
}

export async function getListKeluarga(): Promise<ListKeluarga[]> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('biodata_keluarga')
    .select(`
        id,
        biodata_siswa_id,
        nama_lengkap,
        status_hidup,
        relation_type,
        detail_relation_type,
        nik,
        no_hp,
        tempat_lahir,
        tanggal_lahir,
        penghasilan,
        pekerjaan,
        pendidikan_terakhir,
        alamat,
        updated_at,
        biodata_siswa (
            id,
            nama_lengkap
        )
    `);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil query database (snake_case) ke interface ListKeluarga (camelCase)
  return data.map((item: any) => {
    // Menangani hasil join yang mungkin berupa objek tunggal atau array tergantung relasi Supabase
    const siswa = Array.isArray(item.biodata_siswa) 
      ? item.biodata_siswa[0] 
      : item.biodata_siswa;

    return {
      id: item.id,
      namaLengkap: item.nama_lengkap ?? "",
      statusHidup: item.status_hidup,
      relasi: item.relation_type,
      detailRelasi: item.detail_relation_type,
      nik: item.nik,
      nomorHp: item.no_hp,
      tempatLahir: item.tempat_lahir,
      tanggalLahir: item.tanggal_lahir,
      penghasilan: item.penghasilan,
      pekerjaan: item.pekerjaan,
      pendidikanTerakhir: item.pendidikan_terakhir,
      alamat: item.alamat,
      updatedAt: item.updated_at,
      siswaId: item.biodata_siswa_id ?? siswa?.id,
      namaSiswa: siswa?.nama_lengkap ?? "",
    };
  });
}