"use client";

import { User, School, GraduationCap, ChevronDown, Lock, CheckCircle } from "lucide-react";

interface LembagaTujuanStepProps {
  pendaftaran: any; // Data hasil fetch pendaftaran id
  masterLembaga: any[];
  masterKelas: any[];
}

export default function LembagaTujuanStep({
  pendaftaran,
  masterLembaga,
  masterKelas,
}: LembagaTujuanStepProps) {
  
  // Cari nama lembaga dan kelas berdasarkan ID yang ada di data pendaftaran
  const namaLembaga = masterLembaga.find(l => l.id === pendaftaran?.lembaga_tujuan_id)?.name || "-";
  const namaKelas = masterKelas.find(k => k.id === pendaftaran?.kelas_mi_id)?.name || "Non-MI";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="p-1 sm:p-2">
        
        {/* Info Banner: Memberitahu bahwa data ini sudah dikunci */}
        <div className="mb-8 flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <Lock className="text-amber-500 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-700 leading-relaxed font-medium">
            Data lembaga dan pilihan kelas telah dikunci karena pendaftaran sudah diproses. 
            Hubungi admin jika terdapat kesalahan data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          
          {/* Input Nama Lengkap (Locked) */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 flex items-center gap-2 uppercase tracking-wider">
              <User size={14} /> Nama Lengkap Siswa
            </label>
            <div className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-semibold flex items-center justify-between cursor-not-allowed">
              <span>{pendaftaran?.nama_lengkap}</span>
              <CheckCircle size={16} className="text-green-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             {/* Lembaga Tujuan (Locked) */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 flex items-center gap-2 uppercase tracking-wider">
                <School size={14} /> Lembaga Tujuan
              </label>
              <div className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-semibold cursor-not-allowed">
                {namaLembaga}
              </div>
            </div>

            {/* Kelas (Locked) */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 ml-1 flex items-center gap-2 uppercase tracking-wider">
                <GraduationCap size={14} /> Pilihan Kelas
              </label>
              <div className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-semibold cursor-not-allowed">
                {namaKelas}
              </div>
            </div>
          </div>

          {/* Jenis Kelamin (Locked) */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 flex items-center gap-2 uppercase tracking-wider">
              Jenis Kelamin
            </label>
            <div className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-semibold cursor-not-allowed uppercase text-xs tracking-widest">
              {pendaftaran?.jenis_kelamin || "-"}
            </div>
          </div>

        </div>

        {/* Footer info tambahan */}
        <div className="mt-10 pt-6 border-t border-dashed border-gray-200 flex justify-center">
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <CheckCircle size={14} strokeWidth={3} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Data Terverifikasi</span>
            </div>
        </div>
      </div>
    </div>
  );
}