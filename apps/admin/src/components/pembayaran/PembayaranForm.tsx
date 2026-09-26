"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, FileText, ExternalLink, Calendar, User, ShieldCheck, CreditCard, Hash } from "lucide-react";
import { Button } from "@bn/ui"; 
import { formatDateTimeId } from "@bn/utils";
import type { FormattedPembayaranList } from "@/features/spmb/pembayaran/pembayaran-list";

interface PembayaranFormProps {
  onSuccess?: () => void;
  pembayaranData: FormattedPembayaranList;
}

export default function PembayaranForm({ 
  onSuccess, 
  pembayaranData,
}: PembayaranFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  // Aksi Dummy untuk Verifikasi Pembayaran
  const handleVerify = () => {
    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessage({ success: true, text: "Pembayaran berhasil diverifikasi!" });
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1200);
        }
      } catch (error: any) {
        setMessage({ success: false, text: error.message || "Gagal memverifikasi pembayaran." });
      }
    });
  };

  // Aksi Dummy untuk Tolak Pembayaran
  const handleReject = () => {
    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessage({ success: true, text: "Pembayaran telah ditolak." });
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1200);
        }
      } catch (error: any) {
        setMessage({ success: false, text: error.message || "Gagal menolak pembayaran." });
      }
    });
  };

  const isImageFile = (url?: string | null) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(url) || url.includes("image");
  };

  return (
    <div className="bg-white p-2 sm:p-4 w-full max-w-4xl mx-auto">
      {/* Header Modal */}
      <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
          <h2 className="text-lg font-semibold text-gray-900">
            Verifikasi Pembayaran Pendaftar
          </h2>
        </div>
        <p className="text-xs text-gray-500 ml-7">
          ID Pendaftaran: <span className="font-mono font-medium text-gray-700">{pembayaranData.maskedId}</span>
        </p>
      </div>

      {/* Grid 2 Kolom: Kiri (Bukti Bayar), Kanan (Detail & Tombol Aksi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* KOLOM KIRI: Pratinjau Bukti Bayar / URL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-blue-600" />
            <span>Bukti Pembayaran</span>
          </label>
          
          <div className="w-full h-80 sm:h-96 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden relative group">
            {pembayaranData.url ? (
              isImageFile(pembayaranData.url) ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={pembayaranData.url} 
                    alt="Bukti Bayar" 
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={pembayaranData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-gray-900 rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={14} /> Buka Gambar Penuh
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                  <FileText size={48} className="text-blue-500" />
                  <p className="text-sm text-gray-600 font-medium truncate max-w-[200px]">
                    {pembayaranData.buktiBayar || "Dokumen Lampiran"}
                  </p>
                  <a 
                    href={pembayaranData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={14} /> Unduh / Lihat Dokumen
                  </a>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FileText size={40} />
                <p className="text-xs">Tidak ada bukti pembayaran yang dilampirkan.</p>
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: Data Pembayaran & Tombol Aksi */}
        <div className="flex flex-col justify-between h-full gap-6">
          
          {/* Detail Informasi Pembayaran */}
          <div className="space-y-4 bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Informasi Pendaftaran
            </h3>

            <div className="space-y-4 text-sm">
              {/* Form ID yang dirapikan dengan pembatas max-w & break-all */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500 flex items-center gap-1.5 shrink-0">
                  <Hash size={14} className="text-gray-400" /> Pembayaran ID
                </span>
                <span className="font-mono text-xs font-semibold text-gray-900 text-right max-w-[200px] sm:max-w-[220px] break-all bg-white px-2 py-1 rounded border border-gray-200">
                  {pembayaranData.id || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-1.5 shrink-0">
                  <User size={14} className="text-gray-400" /> Nama Siswa
                </span>
                <span className="font-semibold text-gray-900 text-right">
                  {pembayaranData.namaLengkap || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-1.5 shrink-0">
                  <Calendar size={14} className="text-gray-400" /> Tanggal Kirim
                </span>
                <span className="font-medium text-gray-800 text-right">
                  {formatDateTimeId(pembayaranData.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-1.5 shrink-0">
                  <ShieldCheck size={14} className="text-gray-400" /> Status Saat Ini
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  pembayaranData.status === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                  pembayaranData.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {pembayaranData.status || 'PENDING'}
                </span>
              </div>

              {pembayaranData.verifikatorName && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                  <span className="text-gray-500 text-xs shrink-0">Verifikator Terakhir</span>
                  <span className="font-medium text-gray-700 text-xs text-right">
                    {pembayaranData.verifikatorName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status Pesan Feedback */}
          {message && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${message.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Tombol Aksi: Verify & Reject */}
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                isLoading={isPending}
                onClick={handleReject}
                className="rounded-xl py-3.5 text-red-600 border-red-200 bg-red-50/30 hover:bg-red-100 hover:text-red-700 flex items-center justify-center gap-2 font-medium"
              >
                <XCircle size={16} />
                Tolak (Reject)
              </Button>

              <Button
                type="button"
                variant="primary"
                isLoading={isPending}
                onClick={handleVerify}
                className="rounded-xl py-3.5 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 font-medium shadow-sm"
              >
                <CheckCircle2 size={16} />
                Verifikasi
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}