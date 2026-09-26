import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { BiodataSiswa, BiodataSiswaDetail, PendidikanSiswaSebelumnya, BiodataKeluarga } from "@bn/types";

interface DataPendidikanSebelumnya {
  namaSekolah: PendidikanSiswaSebelumnya['nama_sekolah'];
  npsn: PendidikanSiswaSebelumnya['npsn'];
  alamatSekolah: PendidikanSiswaSebelumnya['alamat_sekolah'];
  tahunLulus: PendidikanSiswaSebelumnya['tahun_lulus'];
  nilaiRataRata: PendidikanSiswaSebelumnya['nilai_rata_rata'];
  catatan: PendidikanSiswaSebelumnya['catatan'];
}

export interface ListSiswa {
    id: BiodataSiswa['id'];
    namaLengkap: BiodataSiswa['nama_lengkap'];
    jenisKelamin: BiodataSiswa['jenis_kelamin'];
    nisn: BiodataSiswa['nisn'];
    nik: BiodataSiswa['nik'];
    noKk: BiodataSiswaDetail['no_kk'];
    lembagaId: BiodataSiswa['lembaga_id'];
    kelasId: BiodataSiswa['kelas_id'];
    tempatLahir: BiodataSiswa['tempat_lahir'];
    tanggalLahir: BiodataSiswa['tanggal_lahir'];
    namaAyah: BiodataKeluarga['nama_lengkap'];
    namaIbu: BiodataKeluarga['nama_lengkap'];
    namaWali: BiodataKeluarga['nama_lengkap'];
    catatan: BiodataSiswa['catatan'];
    agama: BiodataSiswaDetail['agama'];
    citaCita: BiodataSiswaDetail['cita_cita'];
    hobi: BiodataSiswaDetail['hobi'];
    jumlahSaudara: BiodataSiswaDetail['jumlah_saudara'];
    anakKe: BiodataSiswaDetail['anak_ke'];
    penyakit: BiodataSiswaDetail['penyakit'];
    tinggalBersamaId: BiodataSiswaDetail['tinggal_bersama_id'];
    statusRumahId: BiodataSiswaDetail['status_rumah_id'];
    alamat: BiodataSiswaDetail['alamat'];
    pemilikData: BiodataSiswa['owner_user_id'];
    tanggalMendaftar: BiodataSiswa['created_at'];
    pendidikanSebelumnya: DataPendidikanSebelumnya;
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
      tempat_lahir,
      tanggal_lahir,
      catatan,
      owner_user_id,
      created_at,
      biodata_siswa_detail (
        no_kk,
        agama,
        cita_cita,
        hobi,
        jumlah_saudara,
        anak_ke,
        penyakit,
        tinggal_bersama_id,
        status_rumah_id,
        alamat
      ),
      pendidikan_siswa_sebelumnya (
        nama_sekolah,
        npsn,
        alamat_sekolah,
        tahun_lulus,
        nilai_rata_rata,
        catatan
      ),
      biodata_keluarga (
        relation_type,
        nama_lengkap
      )
    `);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil query ke interface ListSiswa
  return data.map((item) => {
    // Helper untuk mengambil nama keluarga berdasarkan relation_type
    const getKeluargaName = (type: 'AYAH' | 'IBU' | 'WALI') => {
      const keluarga = item.biodata_keluarga?.find((k: any) => k.relation_type === type);
      return keluarga ? keluarga.nama_lengkap : '';
    };

    const detail = item.biodata_siswa_detail;
    const pendidikan = item.pendidikan_siswa_sebelumnya;

    return {
      id: item.id,
      namaLengkap: item.nama_lengkap,
      jenisKelamin: item.jenis_kelamin,
      nisn: item.nisn,
      nik: item.nik,
      noKk: detail?.no_kk ?? '',
      lembagaId: item.lembaga_id,
      kelasId: item.kelas_id,
      tempatLahir: item.tempat_lahir,
      tanggalLahir: item.tanggal_lahir,
      
      // Ambil nama dari relasi keluarga
      namaAyah: getKeluargaName('AYAH'),
      namaIbu: getKeluargaName('IBU'),
      namaWali: getKeluargaName('WALI'),

      catatan: item.catatan,
      agama: detail?.agama ?? 'ISLAM',
      citaCita: detail?.cita_cita ?? '',
      hobi: detail?.hobi ?? '',
      jumlahSaudara: detail?.jumlah_saudara ?? 0,
      anakKe: detail?.anak_ke ?? 1,
      penyakit: detail?.penyakit ?? null,
      tinggalBersamaId: detail?.tinggal_bersama_id ?? 0,
      statusRumahId: detail?.status_rumah_id ?? 0,
      alamat: detail?.alamat ?? '',
      
      pemilikData: item.owner_user_id,
      tanggalMendaftar: item.created_at,

      pendidikanSebelumnya: {
        namaSekolah: pendidikan?.nama_sekolah ?? null,
        npsn: pendidikan?.npsn ?? null,
        alamatSekolah: pendidikan?.alamat_sekolah ?? null,
        tahunLulus: pendidikan?.tahun_lulus ?? null,
        nilaiRataRata: pendidikan?.nilai_rata_rata ?? null,
        catatan: pendidikan?.catatan ?? null,
      },
    };
  });
}