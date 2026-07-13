// 📄 File: komponen tempat EmptyPendaftaran berada
import { FileQuestion } from "lucide-react";
import { MasterTahunAjaranListItem } from "@bn/types"; // atau dari mana pun tipe ini diexport

interface EmptyPendaftaranProps {
  // 💡 Ganti tipe datanya di sini agar cocok dengan variabel tahunAjaranAktif kamu
  tahunAjaran: MasterTahunAjaranListItem | null; 
}

export function EmptyPendaftaran({ tahunAjaran }: EmptyPendaftaranProps) {
  // 💡 Sesuaikan pemanggilan propertinya dengan kolom baru yang ada di tabel master baru kamu
  // Contoh: kalau di tabel baru namanya cuma 'tahun', ganti jadi tahunAjaran?.tahun
  const tahunMulai = tahunAjaran?.start_year ?? "-"; 
  const tahunSelesai = tahunAjaran?.end_year ?? "-"; 
  const semester = tahunAjaran?.semester ?? "-";

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-full max-w-md text-center">
        <FileQuestion className="w-16 h-16 text-blue-500 mt-2" />

        <h2 className="text-2xl font-semibold text-gray-800">
          Belum Ada Form Pendaftaran
        </h2>

        <p className="text-gray-600">
          Anda belum memiliki form pendaftaran pada tahun ajaran {tahunMulai} - {tahunSelesai} semester {semester}.
          <br />
          Silakan buat pendaftaran baru untuk melanjutkan proses.
        </p>
      </div>
    </div>
  );
}