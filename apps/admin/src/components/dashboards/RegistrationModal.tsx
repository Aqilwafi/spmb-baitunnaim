"use client";

import { useState, useMemo } from "react";
import { X, Save, Loader2, User, School, GraduationCap, ChevronDown, Lock } from "lucide-react";
import { initRegistrationAction } from "@/actions/initRegistrationAction";
import { RegistrationMasterProps } from "@/types/typeApplication";
import { checkIsMI, isClassFieldLocked } from "@/helpers/registrationHelper";

interface RegistrationModalProps extends RegistrationMasterProps {
  onClose: () => void;
}

export default function RegistrationModal({ onClose, masterLembaga, masterKelas }: RegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLembagaId, setSelectedLembagaId] = useState<string>("");

  const isMI = useMemo(() => checkIsMI(selectedLembagaId, masterLembaga), [selectedLembagaId, masterLembaga]);
  const isLocked = useMemo(() => isClassFieldLocked(selectedLembagaId, isMI), [selectedLembagaId, isMI]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      // Biarkan Server Action menghandle redirect ke step berikutnya
      await initRegistrationAction(formData);
    } catch (error) {
      // Tangani error asli, abaikan internal error redirect Next.js
      if (error instanceof Error && !error.message.includes("NEXT_REDIRECT")) {
        alert(error.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 text-black text-sm">
      <div className="absolute inset-0 bg-blue-950/30 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Pendaftaran Baru</h2>
            <p className="text-sm text-gray-500 font-medium">Lengkapi data awal calon siswa</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-full transition-all active:scale-90">
            <X size={22} className="text-gray-400" />
          </button>
        </div>

        <form action={handleSubmit} className="p-8 pt-4 space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
              <User size={14} className="text-blue-600" /> NAMA LENGKAP SISWA
            </label>
            <input 
              name="nama_lengkap"
              type="text" 
              required
              placeholder="Masukkan nama sesuai akta"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
              <School size={14} className="text-blue-600" /> LEMBAGA TUJUAN
            </label>
            <div className="relative">
              <select 
                name="lembaga_tujuan_id" 
                required 
                value={selectedLembagaId}
                onChange={(e) => setSelectedLembagaId(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 appearance-none focus:bg-white focus:border-blue-500 outline-none transition-all pr-12 cursor-pointer"
              >
                <option value="" disabled>Pilih Lembaga</option>
                {masterLembaga.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">JENIS KELAMIN</label>
              <div className="relative">
                <select name="jenis_kelamin" required className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 appearance-none focus:bg-white outline-none pr-12 cursor-pointer">
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
                <GraduationCap size={14} className="text-blue-600" /> KELAS
                {isLocked && <Lock size={12} className="text-amber-500" />}
              </label>
              <div className="relative">
                {isLocked && <input type="hidden" name="kelas_mi_id" value="1" />}
                <select 
                  name={isLocked ? undefined : "kelas_mi_id"} 
                  required 
                  value={isLocked ? "1" : undefined}
                  disabled={isLocked}
                  className={`w-full px-5 py-4 rounded-2xl border appearance-none outline-none transition-all pr-12 
                    ${isLocked 
                      ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed italic" 
                      : "bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 cursor-pointer"}`}
                >
                  {isLocked ? (
                    <option value="1">Non-MI</option>
                  ) : (
                    <>
                      <option value="" disabled selected>Pilih Kelas</option>
                      {masterKelas.filter(k => k.id !== 1).map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </>
                  )}
                </select>
                {!isLocked && <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4.5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-xl shadow-blue-200 disabled:opacity-70 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sedang Memproses...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Simpan & Lanjutkan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}