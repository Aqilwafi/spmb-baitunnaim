"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, User, ShieldCheck, HeartPulse, FileText } from "lucide-react";
import { biodataKeluargaAction } from "@/actions/pendaftaran/biodata-keluarga";
import { BiodataKeluargaForm } from "@/components/forms/BiodataKeluargaForm";
import type { BiodataKeluargaItemData } from "@/types/biodata.types";
import type { EnumRelasiKeluarga } from "@bn/types";

interface BiodataKeluargaStepProps {
  formId: string;
  status: "active" | "complete";
  relationType: BiodataKeluargaItemData["relationType"];
  data: BiodataKeluargaItemData | null;
  isWaliMandatory?: boolean;
}

export default function BiodataKeluargaStep({
  formId,
  status,
  relationType,
  data,
  isWaliMandatory = false,
}: BiodataKeluargaStepProps) {
  const router = useRouter();

  const labelMap: Record<EnumRelasiKeluarga, string> = {
    AYAH: "Ayah",
    IBU: "Ibu",
    WALI: "Wali",
  };

  const [state, action, isPending] = useActionState(
    (prevState: any, formData: FormData) =>
      biodataKeluargaAction(prevState, formData, formId),
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  // TAMPILAN READ-ONLY (STATUS COMPLETE)
  if (status === "complete" && data) {
    const isHidup = data.statusHidup === "HIDUP";

    return (
      <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
        {/* Header Status */}
        <div className="flex items-start gap-3 mb-1 sm:mb-2">
          <div className="bg-green-100 p-2 rounded-full shrink-0 mt-0.5">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
              Biodata {labelMap[relationType]}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Data {labelMap[relationType].toLowerCase()} telah tersimpan di sistem.
            </p>
          </div>
        </div>

        {/* Detail Ringkasan Data */}
        <div className="p-3.5 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 space-y-3">
          {/* Badge Relation & Status Hidup */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-200/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                {labelMap[relationType]} {data.detailRelationType ? `(${data.detailRelationType})` : ""}
              </span>
            </div>

            <span
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                isHidup
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <HeartPulse size={12} />
              {data.statusHidup || "HIDUP"}
            </span>
          </div>

          {/* Nama Lengkap */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
              Nama Lengkap
            </span>
            <p className="text-sm sm:text-base font-bold text-gray-800 break-words mt-0.5">
              {data.namaLengkap || "-"}
            </p>
          </div>

          {/* Grid Rincian Kontak & Pekerjaan (Tampil Hanya Jika Masih Hidup) */}
          {isHidup ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
              <div>
                <span className="text-[11px] text-gray-400 block">NIK</span>
                <span className="font-semibold text-gray-800 break-all">
                  {data.nik || "-"}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block">No. HP / WhatsApp</span>
                <span className="font-semibold text-gray-800 break-all">
                  {data.noHp || "-"}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block">Pekerjaan</span>
                <span className="font-semibold text-gray-800 break-words">
                  {data.pekerjaan || "-"}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block">Pendidikan Terakhir</span>
                <span className="font-semibold text-gray-800">
                  {data.pendidikanTerakhir || "-"}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block">Penghasilan / Bulan</span>
                <span className="font-semibold text-gray-800">
                  {data.penghasilan || "-"}
                </span>
              </div>

              <div className="sm:col-span-2 pt-1 border-t border-gray-200/50">
                <span className="text-[11px] text-gray-400 block">Alamat</span>
                <span className="font-semibold text-gray-800 break-words">
                  {data.alamat || "-"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic pt-1">
              * Rincian kontak dan pekerjaan tidak tersedia karena status almarhum/almarhumah.
            </p>
          )}
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-2 sm:mt-3">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
            Data tidak dapat diubah secara mandiri. Hubungi panitia pendaftaran jika ada pembaruan data.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug">
            Langkah pengisian data {labelMap[relationType].toLowerCase()} selesai dicatat oleh sistem.
          </p>
        </div>
      </div>
    );
  }

  // TAMPILAN FORM INPUT (STATUS ACTIVE)
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
      {/* Header Form */}
      <div className="flex items-start gap-3 mb-1 sm:mb-2">
        <div className="bg-blue-100 p-2 rounded-full shrink-0 mt-0.5">
          <User className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Isi Biodata {labelMap[relationType]}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Lengkapi formulir data {labelMap[relationType].toLowerCase()} sesuai dengan identitas resmi.
          </p>
        </div>
      </div>

      {/* Komponen Form Input */}
      <BiodataKeluargaForm
        relationType={relationType}
        data={data}
        isWaliMandatory={isWaliMandatory}
        action={action}
        isPending={isPending}
        state={state}
      />

      {/* Warning Info */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-1">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Pastikan NIK dan data diri {labelMap[relationType].toLowerCase()} sudah benar sebelum melanjutkan ke langkah berikutnya.
        </p>
      </div>
    </div>
  );
}