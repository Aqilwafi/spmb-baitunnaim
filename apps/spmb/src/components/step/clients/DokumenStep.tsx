"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  UploadCloud,
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  FileCheck,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Button } from "@bn/ui";
import type { DokumenStepData } from "@/types/form.types";
import type { StepContainerProps } from "@/types/step.types";
import { formatDateTimeId } from "@bn/utils";
import { useFileUpload } from "@/hooks/useFileUpload";
import { dokumenAction } from "@/actions/pendaftaran/dokumen";

interface DokumenStepProps extends StepContainerProps {
  jenisDokumen:
    | "KK_TYPE_DOC"
    | "KTP_AYAH_TYPE_DOC"
    | "KTP_IBU_TYPE_DOC"
    | "AKTE_TYPE_DOC";
  data: DokumenStepData | null;
}

export default function DokumenStep({
  formId,
  status,
  jenisDokumen,
  data,
}: DokumenStepProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  const { upload, isUploading } = useFileUpload();
  const isLoading = isUploading || isSubmittingAction;

  const labelMap: Record<typeof jenisDokumen, string> = {
    KK_TYPE_DOC: "Kartu Keluarga (KK)",
    KTP_AYAH_TYPE_DOC: "KTP Ayah / Wali",
    KTP_IBU_TYPE_DOC: "KTP Ibu / Wali",
    AKTE_TYPE_DOC: "Akte Kelahiran",
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setErrorMessage(null);

    // Step 1: Upload File ke Object Storage via Hook
    const uploadRes = await upload({
      file,
      category: "berkas-pendaftaran",
      documentType: jenisDokumen,
    });

    if (!uploadRes.success) {
      setErrorMessage(uploadRes.message);
      return;
    }

    // Step 2: Simpan Path Berkas via Server Action
    setIsSubmittingAction(true);
    try {
      const actionRes = await dokumenAction({
        formId,
        filePath: uploadRes.data as string,
        jenisDokumen,
      });

      if (!actionRes.success) {
        setErrorMessage(actionRes.message);
      } else {
        router.refresh();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menyimpan data dokumen."
      );
    } finally {
      setIsSubmittingAction(false);
    }
  };

  const isPdf = data?.fileUrl?.toLowerCase().endsWith(".pdf");

  // TAMPILAN READ-ONLY (STATUS COMPLETE)
  if (status === "complete" && data) {
    return (
      <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
        <div className="flex items-start gap-3 mb-1 sm:mb-2">
          <div className="bg-green-100 p-2 rounded-full shrink-0 mt-0.5">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
              {labelMap[jenisDokumen]} Berhasil Diunggah
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Dokumen ini telah tersimpan secara resmi di sistem pendaftaran.
            </p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-gray-200/60 pb-2.5">
            <div className="flex items-center gap-2">
              <FileCheck size={18} className="text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-gray-800">
                Pratinjau Berkas
              </span>
            </div>
            <a
              href={data.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              Buka Berkas
              <ExternalLink size={12} />
            </a>
          </div>

          {isPdf ? (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="text-red-500 shrink-0" size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  Dokumen_{labelMap[jenisDokumen].replace(/[^a-zA-Z0-9]/g, "_")}.pdf
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Format PDF</p>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white max-w-md">
              <img
                src={data.fileUrl}
                alt={labelMap[jenisDokumen]}
                className="w-full h-auto max-h-60 object-contain bg-gray-900/5"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
            <Clock size={14} className="text-gray-400 shrink-0" />
            <span>
              Waktu Unggah:{" "}
              <strong className="text-gray-700 font-medium">
                {formatDateTimeId(data.uploadedAt)}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-2 sm:mt-3">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
            Dokumen tidak dapat diubah secara mandiri. Jika terdapat kesalahan berkas, harap hubungi bagian admin sekretariat pendaftaran.
          </p>
        </div>
      </div>
    );
  }

  // TAMPILAN FORM INPUT (STATUS ACTIVE)
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
      <div className="flex items-start gap-3 mb-1 sm:mb-2">
        <div className="bg-blue-100 p-2 rounded-full shrink-0 mt-0.5">
          <UploadCloud className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Unggah {labelMap[jenisDokumen]}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Silakan unggah dokumen persyaratan yang sah dan terbaca dengan jelas.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Dropzone Container */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border-2 border-dashed transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50/80 scale-[0.99]"
              : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input
            id={`file-upload-${jenisDokumen}`}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={isLoading}
            className="hidden"
          />

          <label
            htmlFor={`file-upload-${jenisDokumen}`}
            className="flex flex-col items-center justify-center w-full cursor-pointer"
          >
            <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-2">
              <UploadCloud size={24} />
            </div>

            <p className="text-xs font-semibold text-gray-700 text-center">
              Klik untuk memilih atau seret berkas ke sini
            </p>
            <p className="text-[10px] text-gray-400 mt-1 text-center">
              Format: JPG, PNG, WEBP, atau PDF (Maks. 2MB)
            </p>
          </label>
        </div>

        {/* Selected File Card */}
        {file && (
          <div className="flex items-center gap-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 animate-in fade-in duration-200">
            {file.type.includes("pdf") ? (
              <FileText size={20} className="text-red-500 shrink-0" />
            ) : (
              <ImageIcon size={20} className="text-blue-600 shrink-0" />
            )}

            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{file.name}</p>
              <p className="text-[10px] text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={isLoading}
              className="p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full sm:w-auto self-start rounded-xl text-xs sm:text-sm py-2.5 px-6"
        >
          {isUploading
            ? "Mengunggah berkas..."
            : isSubmittingAction
            ? "Menyimpan data..."
            : `Unggah ${labelMap[jenisDokumen]}`}
        </Button>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-red-800 leading-relaxed font-medium">
            {errorMessage}
          </p>
        </div>
      )}

      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-1">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Pastikan dokumen berbentuk foto atau PDF yang jernih agar mudah diverifikasi oleh panitia.
        </p>
      </div>
    </div>
  );
}