import { FileQuestionMark } from "lucide-react";
import { TahunAjaranActive } from "@bn/types";

export function EmptyPendaftaran({tahunAjaran,}: {tahunAjaran: TahunAjaranActive | null}) {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-full max-w-md text-center">

        <FileQuestionMark className="w-16 h-16 text-blue-500 mt-2" />

        <h1 className="text-2xl font-semibold text-gray-800">
          Belum Ada Form Pendaftaran
        </h1>

        <p className="text-gray-600">
          {`Anda belum memiliki form pendaftaran pada tahun ajaran ${tahunAjaran?.tahun_mulai} - ${tahunAjaran?.tahun_selesai} semeseter ${tahunAjaran?.semester}.`}
          <br />
          Silakan buat pendaftaran baru untuk melanjutkan proses.
        </p>

      </div>
    </div>
  );
}