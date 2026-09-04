// components/dashboards/pendaftaran/step/InitFormStep.tsx
"use client";

import { CheckCircle2, User, IdCard, MapPin, Calendar, School, GraduationCap, ShieldCheck } from "lucide-react";
import { formatDateId } from "@bn/utils";
import type { InitFormStepData } from "@/features/form/init";

interface InitFormStepProps {
  data: InitFormStepData;
}

export default function InitFormStep({ data }: InitFormStepProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">

        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-green-100 p-2 rounded-full shrink-0">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Formulir Pendaftaran Berhasil Diinisialisasi
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Data dasar di bawah ini telah dikunci oleh sistem untuk keperluan validasi.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
            <User size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Nama Lengkap Siswa</p>
              <p className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">{data.nama_lengkap}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <IdCard size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">NIK (Nomor Induk Kependudukan)</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 tracking-wider">{data.nik}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <div className="w-[18px] h-[18px] flex items-center justify-center font-bold text-blue-600 shrink-0 text-sm">⚥</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Jenis Kelamin</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.jenis_kelamin}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Tempat Lahir</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.tempat_lahir}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <Calendar size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Tanggal Lahir</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{formatDateId(data.tanggal_lahir)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <School size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Lembaga Tujuan</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.lembaga_tujuan ?? "-"}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <GraduationCap size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Kelas</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.kelas ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Data dasar di atas tidak dapat diubah secara mandiri demi keamanan pendaftaran. Jika terdapat kesalahan input data NIK atau nama, harap hubungi bagian admin sekretariat pendaftaran.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
          <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug px-4">
            Langkah inisialisasi ini selesai dicatat oleh sistem pada saat pengisian form pertama.
          </p>
        </div>
      </div>
    </div>
  );
}