// components/step/clients/DokumenStep.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, UploadCloud, FileText, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@bn/ui";
import type { DokumenStepData } from "@/types/form.types";
import type { StepContainerProps } from "@/types/step.types";
import { formatDateTimeId } from "@bn/utils";
import { useFileUpload } from "@/hooks/useFileUpload";
import { dokumenAction } from "@/actions/pendaftaran/dokumen";

interface DokumenStepProps extends StepContainerProps {
  jenisDokumen: "KK_TYPE_DOC" | "KTP_TYPE_DOC" | "AKTE_TYPE_DOC";
  data: DokumenStepData | null;
}

export default function DokumenStep({
  formId,
  status,
  jenisDokumen,
  data,
}: DokumenStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  const { upload, isUploading } = useFileUpload();

  const isLoading = isUploading || isSubmittingAction;

  const labelMap: Record<typeof jenisDokumen, string> = {
    KK_TYPE_DOC: "Kartu Keluarga (KK)",
    KTP_TYPE_DOC: "KTP Orang Tua / Wali",
    AKTE_TYPE_DOC: "Akte Kelahiran",
  };

  const handleUpload = async () => {
    if (!file) return;
    setErrorMessage(null);

    // Step 1: Upload File ke Storage via useFileUpload
    const uploadRes = await upload({
      file,
      category: "dokumen-pendaftaran",
    });

    if (!uploadRes.success) {
      setErrorMessage(uploadRes.message);
      return;
    }

    // Step 2: Kirim Path File & Jenis Dokumen ke Server Action
    setIsSubmittingAction(true);
    try {
      const actionRes = await dokumenAction({
        formId,
        filePath: uploadRes.data as string,
        jenisDokumen,
      });

      if (!actionRes.success) {
        setErrorMessage(actionRes.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menyimpan data dokumen."
      );
    } finally {
      setIsSubmittingAction(false);
    }
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
                {labelMap[jenisDokumen]} Berhasil Diunggah
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Dokumen ini telah tercatat dan diverifikasi oleh sistem.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <FileText size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Pratinjau Berkas</p>
                <img
                  src={data.fileUrl}
                  alt={labelMap[jenisDokumen]}
                  className="mt-2 w-full max-w-sm rounded-xl border border-gray-100"
                />
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Diunggah Pada</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{formatDateTimeId(data.uploadedAt)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
            <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
              Dokumen tidak dapat diubah secara mandiri. Jika terdapat kesalahan berkas, harap hubungi bagian admin sekretariat pendaftaran.
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
              Unggah {labelMap[jenisDokumen]}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Silakan unggah dokumen persyaratan yang sah dan terbaca dengan jelas.
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 space-y-3">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={isLoading}
            className="cursor-pointer text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          <Button onClick={handleUpload} disabled={!file || isLoading} className="rounded-xl">
            {isUploading
              ? "Mengunggah berkas..."
              : isSubmittingAction
              ? "Menyimpan data..."
              : `Unggah ${labelMap[jenisDokumen]}`}
          </Button>
        </div>

        {errorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-[1.5rem] mt-4">
            <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-red-800 leading-relaxed font-medium">{errorMessage}</p>
          </div>
        )}

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan dokumen berbentuk foto atau PDF yang jernih agar mudah diverifikasi oleh panitia.
          </p>
        </div>
      </div>
    </div>
  );
}