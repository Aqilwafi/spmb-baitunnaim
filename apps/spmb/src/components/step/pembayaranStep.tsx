"use client";

import React, { useState } from "react";
import { Copy, Check, UploadCloud } from "lucide-react";

// Definisikan interface agar menerima data dari dynamic component parent
interface PembayaranStepProps {
  email?: string;
  pendaftaranId?: string;
  userid?: string;
  currentStep?: number; // 💡 Dioper dari StepComponent dinamis
}

export default function PembayaranStep({ currentStep = 2 }: PembayaranStepProps) {
  const targetStep = 2; // Batasan konstan untuk step pembayaran

  // State untuk dummy
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [bukti, setBukti] = useState<File | null>(null);
  
  // LOGIKA STATUS DINAMIS
  // Jika currentStep > 2, berarti statusnya sudah selesai
  const [isDone, setIsDone] = useState(currentStep > targetStep);
  // Cek apakah step saat ini sedang aktif diisi (pas di step 2)
  const isCurrentActive = currentStep === targetStep;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCurrentActive) return; // Kunci input jika tidak aktif
    if (e.target.files && e.target.files[0]) {
      setBukti(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentActive) return;
    if (!bukti) return alert("Pilih file bukti transfer terlebih dahulu");
    
    setLoading(true);

    // DUMMY DELAY: Simulasi upload
    setTimeout(() => {
      setLoading(false);
      setIsDone(true);
      alert("Bukti pembayaran berhasil diunggah! (Mode Dummy)");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Informasi Pembayaran */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-[2rem] p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2 text-sm">
          Instruksi Pembayaran (Mode Dummy)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rekening PAUD */}
          <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">TPA / KB / TK</span>
            <p className="text-xl font-bold text-gray-800 mt-1">Rp160.000</p>
            <div className="mt-3 p-3 bg-gray-50 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">No. Rekening BSI</p>
                <p className="font-mono font-bold text-gray-700">1752831078</p>
              </div>
              <button 
                type="button"
                onClick={() => handleCopy("1752831078")}
                className="p-2 hover:bg-white rounded-xl transition-colors text-blue-600"
              >
                {copied === "1752831078" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Rekening MI */}
          <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm">
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Madrasah Ibtidaiyah</span>
            <p className="text-xl font-bold text-gray-800 mt-1">Rp160.000</p>
            <div className="mt-3 p-3 bg-gray-50 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">No. Rekening BSI</p>
                <p className="font-mono font-bold text-gray-700">1752831261</p>
              </div>
              <button 
                type="button"
                onClick={() => handleCopy("1752831261")}
                className="p-2 hover:bg-white rounded-xl transition-colors text-blue-600"
              >
                {copied === "1752831261" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-blue-400 mt-4 leading-relaxed italic text-center">
          *Khusus alumni KB Baitun Na’im ke TK, biaya formulir Rp120.000
        </p>
      </div>

      {/* Upload Area */}
      {!isDone ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group relative">
            <input
              id="file-upload"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              disabled={!isCurrentActive} // Kunci input jika bukan stepnya
              className="hidden"
            />
            <label
              htmlFor={isCurrentActive ? "file-upload" : undefined}
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2.5rem] transition-all 
              ${!isCurrentActive 
                ? "border-gray-200 bg-gray-100/50 cursor-not-allowed opacity-60" 
                : bukti 
                  ? "border-green-400 bg-green-50/30 cursor-pointer" 
                  : "border-gray-200 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer"}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {bukti ? (
                  <>
                    <div className="bg-green-500 text-white p-2 rounded-full mb-2">
                      <Check size={24} />
                    </div>
                    <p className="text-sm font-bold text-green-700 max-w-[200px] truncate">{bukti.name}</p>
                    <p className="text-[10px] text-green-500 uppercase font-black mt-1">File Terpilih</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className={`w-10 h-10 mb-3 ${isCurrentActive ? "text-gray-400 group-hover:text-blue-500" : "text-gray-300"} transition-colors`} />
                    <p className="mb-1 text-sm text-gray-500 font-bold">
                      {isCurrentActive ? "Klik untuk upload bukti transfer" : "Selesaikan tahap sebelumnya terlebih dahulu"}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-black">PDF, JPG, atau PNG</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !bukti || !isCurrentActive}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg 
              ${loading || !bukti || !isCurrentActive 
                ? "bg-gray-400 cursor-not-allowed shadow-none" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-100"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                Memproses...
              </span>
            ) : (
              "Konfirmasi Pembayaran Sekarang"
            )}
          </button>
        </form>
      ) : (
        <div className="p-6 bg-green-50 border border-green-100 rounded-[2rem] text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full mb-3 shadow-lg shadow-green-100">
            <Check size={24} strokeWidth={3} />
          </div>
          <h4 className="text-green-800 font-bold italic text-lg">Bukti Pembayaran Tersimpan</h4>
          <p className="text-green-600/70 text-sm mt-1">Bukti transfer Anda sedang dalam tahap verifikasi oleh panitia.</p>
        </div>
      )}
    </div>
  );
}