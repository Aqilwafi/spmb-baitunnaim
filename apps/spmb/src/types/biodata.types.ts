import type { EnumRelasiKeluarga, EnumStatusHidup, BiodataKeluarga, BiodataSiswaDetail, BiodataSiswa, PendidikanSiswaSebelumnya } from "@bn/types";

export interface BiodataSiswaDetailItemData {
  noKk: BiodataSiswaDetail["no_kk"];
  agama: BiodataSiswaDetail["agama"];
  anakKe: BiodataSiswaDetail["anak_ke"];
  jumlahSaudara: BiodataSiswaDetail["jumlah_saudara"];
  hobi: BiodataSiswaDetail["hobi"];
  citaCita: BiodataSiswaDetail["cita_cita"];
  penyakit: BiodataSiswaDetail["penyakit"];
  alamat: BiodataSiswaDetail["alamat"];
  tinggalBersamaId: BiodataSiswaDetail["tinggal_bersama_id"];
  statusRumahId: BiodataSiswaDetail["status_rumah_id"];
  nisn: BiodataSiswa['nisn'];
}

export interface PendidikanSiswaItemData {
  namaSekolah: PendidikanSiswaSebelumnya['nama_sekolah'];
  alamatSekolah: PendidikanSiswaSebelumnya['alamat_sekolah'];
  npsn: PendidikanSiswaSebelumnya['npsn'];
  tahunLulus: PendidikanSiswaSebelumnya['tahun_lulus'];
  nilaiRataRata: PendidikanSiswaSebelumnya['nilai_rata_rata'];
  catatan: PendidikanSiswaSebelumnya['catatan'];
}

export interface BiodataKeluargaItemData {
  relationType: EnumRelasiKeluarga;
  detailRelationType?: BiodataKeluarga["detail_relation_type"];
  namaLengkap: BiodataKeluarga["nama_lengkap"];
  nik?: BiodataKeluarga["nik"];
  statusHidup: EnumStatusHidup;
  tempatLahir?: BiodataKeluarga["tempat_lahir"];
  tanggalLahir?: BiodataKeluarga["tanggal_lahir"];
  pekerjaan?: BiodataKeluarga["pekerjaan"];
  pendidikanTerakhir?: BiodataKeluarga["pendidikan_terakhir"];
  penghasilan?: BiodataKeluarga["penghasilan"];
  noHp?: BiodataKeluarga["no_hp"];
  alamat?: BiodataKeluarga['alamat'];
}