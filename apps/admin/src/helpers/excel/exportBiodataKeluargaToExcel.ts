// apps/admin/src/helpers/exportExcel.ts (atau sesuaikan path project Anda)
import * as XLSX from "xlsx";
import type { FormattedListKeluarga } from "@/features/biodata/keluarga";

export function exportBiodataKeluargaToExcel(data: FormattedListKeluarga[], filename = "Data_Biodata_Keluarga.xlsx") {
  if (!data || data.length === 0) {
    throw new Error("Tidak ada data untuk diexport!");
  }

  // 1. Mapping data agar header kolom Excel rapi dan mudah dibaca
  const mappedData = data.map((item, index) => ({
    No: index + 1,
    "Nama Anggota Keluarga": item.namaLengkap,
    "Nama Siswa": item.namaSiswa,
    Relasi: item.relasi,
    "Detail Relasi": item.detailRelasi || "-",
    "Status Hidup": item.statusHidup,
    NIK: item.nik ? `\t${item.nik}` : "-", // Tambah tab agar NIK tidak terpotong jadi scientific number di Excel
    "Nomor HP": item.nomorHp || "-",
    "Tempat Lahir": item.tempatLahir || "-",
    "Tanggal Lahir": item.tanggalLahir || "-",
    Pekerjaan: item.pekerjaan || "-",
    "Pendidikan Terakhir": item.pendidikanTerakhir || "-",
    Penghasilan: item.penghasilan || "-",
    Alamat: item.alamat || "-",
  }));

  // 2. Buat Worksheet dari data JSON
  const worksheet = XLSX.utils.json_to_sheet(mappedData);

  // 3. Buat Workbook baru dan masukkan worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Keluarga");

  // 4. Trigger download file Excel di browser
  XLSX.writeFile(workbook, filename);
}