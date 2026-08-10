// components/step/clients/PembayaranStep.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, UploadCloud, Receipt, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@bn/ui";
import { formatDateId } from "@bn/utils"; // sesuaikan path

export interface PembayaranStepData {
  bukti_bayar_url: string;
  uploaded_at: string;
}

interface PembayaranStepProps {
  pendaftaran_id: string;
  user_id: string;
  status: "active" | "complete";
  data: PembayaranStepData | null;
}

export default function PembayaranStep({
  pendaftaran_id,
  user_id,
  status,
  data,
}: PembayaranStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // TODO: ganti dengan upload asli ke Supabase Storage
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    // Dummy delay, simulasi upload
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("dummy upload:", { pendaftaran_id, user_id, file: file.name });
    setUploading(false);
  };

  if (status === "complete" && data) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
        <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">

          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                Bukti Pembayaran Diterima
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Bukti bayar di bawah ini telah tercatat oleh sistem.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <Receipt size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Bukti Bayar</p>
                <img
                  src={data.bukti_bayar_url}
                  alt="Bukti bayar"
                  className="mt-2 w-full max-w-sm rounded-xl border border-gray-100"
                />
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Diunggah Pada</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{formatDateId(data.uploaded_at)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
            <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
              Bukti bayar tidak dapat diubah secara mandiri. Jika terdapat kesalahan unggah, harap hubungi bagian admin sekretariat pendaftaran.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug px-4">
              Langkah pembayaran ini selesai dicatat oleh sistem pada saat bukti bayar diunggah.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">

        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-blue-100 p-2 rounded-full shrink-0">
            <UploadCloud className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Unggah Bukti Pembayaran
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Silakan unggah bukti transfer atau bukti bayar untuk melanjutkan proses pendaftaran.
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 space-y-3">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <Button onClick={handleUpload} disabled={!file || uploading} className="rounded-xl">
            {uploading ? "Mengunggah..." : "Unggah Bukti Bayar"}
          </Button>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan file yang diunggah jelas dan sesuai dengan nominal pembayaran yang tertera.
          </p>
        </div>
      </div>
    </div>
  );
}