"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  GraduationCap,
  School,
  ShieldCheck,
  FileText,
  Award,
} from "lucide-react";
import { pendidikanSebelumnyaAction } from "@/actions/pendaftaran/pendidikan-sebelumnya";
import { PendidikanSebelumnyaForm } from "@/components/forms/PendidikanSebelumnyaForm";
import type { PendidikanSiswaItemData } from "@/types/biodata.types";
import type { StepContainerProps } from "@/types/step.types";

interface PendidikanSebelumnyaStepProps extends StepContainerProps {
  data: PendidikanSiswaItemData | null;
}

export default function PendidikanSebelumnyaStep({
  formId,
  status,
  data,
}: PendidikanSebelumnyaStepProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    (prevState: any, formData: FormData) =>
      pendidikanSebelumnyaAction(prevState, formData, formId),
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  // TAMPILAN READ-ONLY (STATUS COMPLETE)
  if (status === "complete" && data) {
    return (
      <div className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-500">
        {/* Header Status */}
        <div className="flex items-start gap-3 mb-1 sm:mb-2">
          <div className="bg-green-100 p-2 rounded-full shrink-0 mt-0.5">
            <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
              Pendidikan Sebelumnya
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Data rincian sekolah asal telah berhasil tersimpan di sistem.
            </p>
          </div>
        </div>

        {/* List Data Detail */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Institusi Asal */}
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <School size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Institusi Asal
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5 break-words">
                {data.namaSekolah || "-"}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-200/60">
                <div>
                  <span className="text-[11px] text-gray-400 block">NPSN</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 break-all">
                    {data.npsn || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Alamat Sekolah</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 break-words">
                    {data.alamatSekolah || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Akademik & Kelulusan */}
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <Award size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Akademik & Kelulusan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div>
                  <span className="text-[11px] text-gray-400 block">Tahun Lulus</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {data.tahunLulus || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Nilai Rata-rata</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {data.nilaiRataRata ?? "-"}
                  </span>
                </div>
              </div>

              {data.catatan && (
                <div className="mt-2 pt-2 border-t border-gray-200/60">
                  <span className="text-[11px] text-gray-400 block">Catatan Tambahan</span>
                  <p className="text-xs text-gray-700 italic mt-0.5 break-words">
                    {data.catatan}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-2 sm:mt-3">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
            Data yang dikirimkan bersifat permanen. Jika ada perubahan data penting, silakan hubungi admin sekolah.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
          <p className="text-center text-[10px] sm:text-xs text-gray-400 italic leading-snug">
            Langkah pengisian riwayat pendidikan ini selesai dicatat oleh sistem.
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
          <GraduationCap className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Pendidikan Sebelumnya
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Masukkan informasi sekolah asal dan data kelulusan Anda.
          </p>
        </div>
      </div>

      {/* Komponen Form */}
      <PendidikanSebelumnyaForm
        data={data}
        action={action}
        isPending={isPending}
        state={state}
      />

      {/* Warning Info */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-1">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Pastikan NPSN dan nama sekolah sudah sesuai dengan ijazah atau Surat Keterangan Lulus (SKL).
        </p>
      </div>
    </div>
  );
}