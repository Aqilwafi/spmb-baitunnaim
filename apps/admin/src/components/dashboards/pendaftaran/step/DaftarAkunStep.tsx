"use client";

import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";

interface DaftarAkunStepProps {
  email?: string;
}

export default function DaftarAkunStep({ email = "user@example.com" }: DaftarAkunStepProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      {/* Container utama dengan padding dinamis */}
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
        
        {/* Header Step: Responsive Text Size */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <div className="bg-green-100 p-2 rounded-full shrink-0">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">
            Akun Berhasil Dibuat
          </h2>
        </div>

        {/* Informasi Akun */}
        <div className="space-y-4 sm:space-y-6">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-1">
            Selamat! Akun pendaftaran Anda telah aktif. Gunakan email ini sebagai identitas utama Anda dalam sistem pendaftaran.
          </p>

          {/* Email Card: Menangani email panjang agar tidak overflow */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm w-fit shrink-0">
              <Mail className="text-blue-600" size={20} />
            </div>
            <div className="min-w-0 flex-1"> {/* min-w-0 penting untuk truncate/break-all */}
              <p className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-0.5">
                Email Terdaftar
              </p>
              <p className="text-gray-700 font-semibold text-sm sm:text-base break-all sm:break-normal">
                {email}
              </p>
            </div>
          </div>

          {/* Security Alert: Padding & Icon Adjustment */}
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-[1.5rem] border border-blue-100">
            <ShieldCheck className="text-blue-500 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-blue-700 leading-relaxed font-medium">
              Data Anda dilindungi enkripsi terpusat. Jangan bagikan kredensial login Anda kepada siapa pun.
            </p>
          </div>
        </div>

        {/* Footer Info: Border dashed styling */}
        <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
          <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug px-4">
            Langkah ini telah diverifikasi secara sistem saat proses pendaftaran akun selesai.
          </p>
        </div>
      </div>
    </div>
  );
}