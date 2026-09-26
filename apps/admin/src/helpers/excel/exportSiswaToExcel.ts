// apps/admin/src/helpers/excel/exportSiswa.ts
import * as XLSX from "xlsx";
import type { FormattedListSiswa } from "@/features/biodata/siswa"; // Sesuaikan path

export function exportSiswaToExcel(data: FormattedListSiswa[], filename = "Data_Siswa_Lengkap.xlsx") {
  if (!data || data.length === 0) {
    throw new Error("Tidak ada data untuk diexport!");
  }

  const workbook = XLSX.utils.book_new();

  // --- BAGIAN 1: Buat Sheet berdasarkan "Kelas" ---
  const groupedByKelas = data.reduce((acc, item) => {
    const key = item.kelas || "Tanpa Kelas";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, FormattedListSiswa[]>);

  for (const [kelasName, siswaList] of Object.entries(groupedByKelas)) {
    const mappedDataSiswa = siswaList.map((item, index) => ({
      No: index + 1,
      "Nama Lengkap": item.namaLengkap,
      "Jenis Kelamin": item.jenisKelamin === "FEMALE" ? "Perempuan" : "Laki-laki",
      NISN: item.nisn ? `\t${item.nisn}` : "-",
      NIK: item.nik ? `\t${item.nik}` : "-",
      "No. KK": item.noKk ? `\t${item.noKk}` : "-",
      "Tempat, Tanggal Lahir": `${item.tempatLahir}, ${item.tanggalLahir}`,
      Agama: item.agama,
      Alamat: item.alamat,
      "Tinggal Bersama": item.tinggalBersama,
      "Status Rumah": item.statusRumah,
      "Nama Ayah": item.namaAyah || "-",
      "Nama Ibu": item.namaIbu || "-",
      "Nama Wali": item.namaWali || "-",
      Hobi: item.hobi,
      "Cita-cita": item.citaCita,
      "Jumlah Saudara": item.jumlahSaudara,
      "Anak Ke": item.anakKe,
      Catatan: item.catatan || "-",
      "Email Pemilik Data": item.email,
    }));

    const worksheetSiswa = XLSX.utils.json_to_sheet(mappedDataSiswa);
    
    // Amankan nama sheet maksimal 31 karakter dan bebas dari karakter ilegal Excel
    const safeSheetName = kelasName.substring(0, 31).replace(/[:\\\/?*\[\]]/g, "_");
    XLSX.utils.book_append_sheet(workbook, worksheetSiswa, safeSheetName);
  }

  // --- BAGIAN 2: Buat Sheet "Pendidikan Siswa Sebelumnya" ---
  const mappedDataPendidikan = data.map((item, index) => ({
    No: index + 1,
    "Nama Siswa": item.namaLengkap,
    Kelas: item.kelas,
    "Nama Sekolah Asal": item.pendidikanSebelumnya?.namaSekolah || "-",
    NPSN: item.pendidikanSebelumnya?.npsn ? `\t${item.pendidikanSebelumnya.npsn}` : "-",
    "Alamat Sekolah": item.pendidikanSebelumnya?.alamatSekolah || "-",
    "Tahun Lulus": item.pendidikanSebelumnya?.tahunLulus || "-",
    "Nilai Rata-rata": item.pendidikanSebelumnya?.nilaiRataRata ?? "-",
    "Catatan / Keterangan": item.pendidikanSebelumnya?.catatan || "-",
  }));

  const worksheetPendidikan = XLSX.utils.json_to_sheet(mappedDataPendidikan);
  XLSX.utils.book_append_sheet(workbook, worksheetPendidikan, "Pendidikan Sebelumnya");

  // --- Download File Excel ---
  XLSX.writeFile(workbook, filename);
}