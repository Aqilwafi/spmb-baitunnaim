"use client";

import { useState } from "react";
import {
  CheckCircle2,
  UploadCloud,
  Receipt,
  Clock,
  ShieldCheck,
  AlertCircle,
  CreditCard,
  Copy,
  Check,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@bn/ui";
import type { PembayaranStepData } from "@/types/form.types";
import type { StepContainerProps } from "@/types/step.types";
import { formatDateTimeId } from "@bn/utils";
import { useFileUpload } from "@/hooks/useFileUpload";
import { pembayaranAction } from "@/actions/pendaftaran/pembayaran";

interface PembayaranStepProps extends StepContainerProps {
  data: PembayaranStepData | null;
}

export default function PembayaranStep({
  formId,
  status,
  data,
}: PembayaranStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const [copied, setCopied] = useState(false);

  const { upload, isUploading } = useFileUpload();
  const isLoading = isUploading || isSubmittingAction;

  const handleCopyRekening = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = async () => {
    if (!file) return;
    setErrorMessage(null);

    // Step 1: Upload File ke Storage
    const uploadRes = await upload({
      file,
      category: "bukti-pembayaran",
    });

    if (!uploadRes.success) {
      setErrorMessage(uploadRes.message);
      return;
    }

    // Step 2: Kirim Path File ke Server Action
    setIsSubmittingAction(true);
    try {
      const actionRes = await pembayaranAction({
        formId: formId,
        filePath: uploadRes.data as string,
      });

      if (!actionRes.success) {
        setErrorMessage(actionRes.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan data pembayaran."
      );
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // TAMPILAN STATUS COMPLETE
  if (status === "complete" && data) {
    const isPdf = data.urlBuktiBayar.toLowerCase().endsWith(".pdf");

    return (
      <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
        {/* Header Status */}
        <div className="flex items-start gap-3 mb-1 sm:mb-2">
          <div className="bg-green-100 p-2 rounded-full shrink-0 mt-0.5">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
              Bukti Pembayaran Diterima
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Bukti bayar di bawah ini telah tercatat oleh sistem.
            </p>
          </div>
        </div>

        {/* Data Bukti Bayar */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <Receipt size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Bukti Bayar
              </p>
              
              <div className="mt-2.5">
                {isPdf ? (
                  <a
                    href={data.urlBuktiBayar}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <FileText size={18} />
                    <span>Lihat Dokumen Bukti Bayar (PDF)</span>
                  </a>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white max-w-xs">
                    <img
                      src={data.urlBuktiBayar}
                      alt="Bukti bayar"
                      className="w-full h-auto object-cover max-h-60"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Diunggah Pada
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {formatDateTimeId(data.uploadedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-2 sm:mt-3">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
            Bukti bayar tidak dapat diubah secara mandiri. Jika terdapat kesalahan unggah, harap hubungi admin pendaftaran.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug">
            Langkah pembayaran ini selesai dicatat oleh sistem pada saat bukti bayar diunggah.
          </p>
        </div>
      </div>
    );
  }

  // TAMPILAN UNTUK FORM UNGGAH (ACTIVE)
  const noRekening = "1230012345678";

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
      {/* Header Form */}
      <div className="flex items-start gap-3 mb-1 sm:mb-2">
        <div className="bg-blue-100 p-2 rounded-full shrink-0 mt-0.5">
          <UploadCloud className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Unggah Bukti Pembayaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Silakan lakukan transfer sesuai rekening di bawah, lalu unggah bukti pembayarannya.
          </p>
        </div>
      </div>

      {/* Informasi Rekening Tujuan */}
      <div className="p-3.5 sm:p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
        <div className="flex items-center gap-2 mb-2.5">
          <CreditCard size={18} className="text-blue-600 shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold text-gray-800">
            Rekening Pembayaran Resmi
          </h3>
        </div>
        <div className="space-y-1.5 text-xs text-gray-700">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500">Bank:</span>
            <span className="font-semibold text-gray-800">Bank Mandiri</span>
          </div>
          
          <div className="flex justify-between items-center pt-0.5">
            <span className="font-medium text-gray-500">No. Rekening:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-gray-900 tracking-wider">
                123-00-1234567-8
              </span>
              <button
                type="button"
                onClick={() => handleCopyRekening(noRekening)}
                className="p-1 rounded-md bg-white border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
                title="Salin No Rekening"
              >
                {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <span className="font-medium text-gray-500">Atas Nama:</span>
            <span className="font-semibold text-gray-800">Yayasan Pendidikan</span>
          </div>
        </div>
      </div>

      {/* Input File Custom Dropzone */}
      <div className="space-y-3">
        <div className="relative border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50/50 rounded-xl p-4 transition-colors text-center">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={isLoading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />

          {file ? (
            <div className="flex items-center justify-between bg-white p-2.5 px-3 rounded-lg border border-blue-200 relative z-20">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <FileText size={18} className="text-blue-600 shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                disabled={isLoading}
                className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 py-2">
              <UploadCloud className="text-gray-400 w-8 h-8" />
              <div className="text-xs text-gray-600 font-medium">
                <span className="text-blue-600 font-semibold">Pilih berkas</span> atau seret ke sini
              </div>
              <p className="text-[10px] text-gray-400">
                Format: JPG, PNG, atau PDF (Maks. 5MB)
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full rounded-xl py-2.5 text-xs sm:text-sm font-semibold"
        >
          {isUploading
            ? "Mengunggah berkas..."
            : isSubmittingAction
            ? "Menyimpan data..."
            : "Unggah Bukti Bayar"}
        </Button>
      </div>

      {/* Error State */}
      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-red-800 leading-relaxed font-medium">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Warning Info */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-1">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Pastikan bukti pembayaran menampilkan nominal dan nama pengirim dengan jelas.
        </p>
      </div>
    </div>
  );
}