"use client";

import {
  CheckCircle2,
  User,
  IdCard,
  MapPin,
  Calendar,
  School,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import { formatDateId } from "@bn/utils";
import type { FormattedInitFormStepData } from "@/features/pendaftaran/data/init";

interface InitFormStepProps {
  data: FormattedInitFormStepData;
}

export default function InitFormStep({ data }: InitFormStepProps) {
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
      {/* Banner Status Berhasil */}
      <div className="flex items-start gap-3 mb-1 sm:mb-2">
        <div className="bg-green-100 p-2 rounded-full shrink-0 mt-0.5">
          <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Formulir Pendaftaran Berhasil Diinisialisasi
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Data dasar di bawah ini telah dikunci oleh sistem untuk keperluan validasi.
          </p>
        </div>
      </div>

      {/* Item List Data */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Nama Lengkap */}
        <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
          <User size={18} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Nama Lengkap Siswa
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5 break-words">
              {data.namaLengkap}
            </p>
          </div>
        </div>

        {/* NIK */}
        <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
          <IdCard size={18} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              NIK (Nomor Induk Kependudukan)
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5 tracking-wider break-all">
              {data.nik}
            </p>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
          <Users size={18} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Jenis Kelamin
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">
              {data.genderFormatted}
            </p>
          </div>
        </div>

        {/* Tempat & Tanggal Lahir (1 kolom mobile, 2 kolom tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Tempat Lahir
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
                {data.tempatLahir}
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <Calendar size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Tanggal Lahir
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {formatDateId(data.tanggalLahir)}
              </p>
            </div>
          </div>
        </div>

        {/* Lembaga Tujuan & Kelas (1 kolom mobile, 2 kolom tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <School size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Lembaga Tujuan
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
                {data.lembagaTujuan ?? "-"}
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <GraduationCap size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Kelas
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {data.kelas ?? "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Note */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-2 sm:mt-3">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Data dasar di atas tidak dapat diubah secara mandiri. Jika terdapat kesalahan NIK atau nama, harap hubungi admin pendaftaran.
        </p>
      </div>

      {/* Footer Note */}
      <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
        <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug">
          Langkah inisialisasi ini selesai dicatat oleh sistem pada saat pengisian form pertama.
        </p>
      </div>
    </div>
  );
}