import type { FormPendaftaran, Pembayaran, BiodataSiswa, BiodataSiswaDetail, PendidikanSiswaSebelumnya, 
    BiodataKeluarga, Dokumen, BaseDocumentPayload } from "@bn/types";


export interface BaseRPCParams {
    formId: FormPendaftaran['id'];
}

export interface RPCPembayaranDanDokumen extends BaseRPCParams {
    input: BaseDocumentPayload;
}

export type BaseRPCSubmitResponse = {
  success: boolean;
  form_id: string;
  next_step_id?: number;
}

export interface RPCGetInitResult {
  nama_lengkap: BiodataSiswa['nama_lengkap'];
  nik: BiodataSiswa['nik'];
  jenis_kelamin: BiodataSiswa['jenis_kelamin'];
  tempat_lahir: BiodataSiswa['tempat_lahir'];
  tanggal_lahir: BiodataSiswa['tanggal_lahir'];
  lembaga_tujuan: string;
  kelas: string | null;
}

export interface RPCGetPembayaranResult {
  bukti_pembayaran_url: Pembayaran['bukti_pembayaran_url'];
  payment_status: Pembayaran['payment_status'];
  created_at: Pembayaran['created_at'];
  verified_at: Pembayaran['verified_at'];
  verified_by: string | null;
}

export interface RPCGetBiodataSiswaDetail {
  nisn: BiodataSiswa['nisn'];
  no_kk: BiodataSiswaDetail['no_kk'];
  agama: BiodataSiswaDetail['agama'];
  anak_ke: BiodataSiswaDetail['anak_ke'];
  jumlah_saudara: BiodataSiswaDetail['jumlah_saudara'];
  hobi: BiodataSiswaDetail['hobi'];
  cita_cita: BiodataSiswaDetail['cita_cita'];
  penyakit: BiodataSiswaDetail['penyakit'];
  alamat: BiodataSiswaDetail['alamat'];
  tinggal_bersama_id: BiodataSiswaDetail['tinggal_bersama_id'];
  status_rumah_id: BiodataSiswaDetail['status_rumah_id'];
}

export interface RPCGetBiodataKeluarga {
  relation_type: BiodataKeluarga['relation_type'];
  detail_relation_type: BiodataKeluarga['detail_relation_type'];
  nama_lengkap: BiodataKeluarga['nama_lengkap'];
  nik: BiodataKeluarga['nik'];
  status_hidup: BiodataKeluarga['status_hidup'];
  tempat_lahir: BiodataKeluarga['tempat_lahir'];
  tanggal_lahir: BiodataKeluarga['tanggal_lahir'];
  pekerjaan: BiodataKeluarga['pekerjaan'];
  pendidikan_terakhir: BiodataKeluarga['pendidikan_terakhir'];
  penghasilan: BiodataKeluarga['penghasilan'];
  no_hp: BiodataKeluarga['no_hp'];
  alamat: BiodataKeluarga['alamat'];
}

export interface RPCGetPendidikanSiswaSebelumnya {
  nama_sekolah: PendidikanSiswaSebelumnya['nama_sekolah'];
  npsn: PendidikanSiswaSebelumnya['npsn'];
  alamat_sekolah: PendidikanSiswaSebelumnya['alamat_sekolah'];
  tahun_lulus: PendidikanSiswaSebelumnya['tahun_lulus'];
  nilai_rata_rata: PendidikanSiswaSebelumnya['nilai_rata_rata'];
  catatan: PendidikanSiswaSebelumnya['catatan'];
}

export interface RPCGetDokumen {
  id: Dokumen['id'];
  form_pendaftaran_id: Dokumen['form_pendaftaran_id'];
  tipe_dokumen_id: Dokumen['tipe_dokumen_id'];
  file_url: Dokumen['file_url'];
  document_status: Dokumen['document_status'];
  catatan_verifikasi: Dokumen['catatan_verifikasi'];
  verified_by: Dokumen['verified_by'];
  verified_at: Dokumen['verified_at'];
  uploaded_at: Dokumen['uploaded_at'];
}