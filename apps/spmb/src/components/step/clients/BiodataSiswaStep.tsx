"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  FileText,
  Home,
  HeartHandshake,
  Heart,
} from "lucide-react";
import { biodataSiswaDetailAction } from "@/actions/pendaftaran/biodata-siswa-detail";
import { BiodataSiswaDetailForm } from "@/components/forms/BiodataSiswaDetailForm";
import type { MasterData } from "@bn/types";
import type { StepContainerProps } from "@/types/step.types";
import type { BiodataSiswaDetailItemData } from "@/types/biodata.types";

interface BiodataSiswaDetailStepProps extends StepContainerProps {
  data: BiodataSiswaDetailItemData | null;
  statusRumahOptions: MasterData[];
  tinggalBersamaOptions: MasterData[];
}

export default function BiodataSiswaDetailStep({
  formId,
  status,
  data,
  statusRumahOptions,
  tinggalBersamaOptions,
}: BiodataSiswaDetailStepProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    (prevState: any, formData: FormData) =>
      biodataSiswaDetailAction(prevState, formData, formId),
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  const getLabelById = (options: MasterData[], id?: number) => {
    if (!id) return "-";
    return options.find((opt) => opt.value === id)?.label || "-";
  };

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
              Biodata Detail Siswa
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Data rincian siswa telah berhasil tersimpan di sistem.
            </p>
          </div>
        </div>

        {/* List Data Detail */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Identitas Resmi */}
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <FileText size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Identitas Resmi
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                <div>
                  <span className="text-[11px] text-gray-400 block">NISN</span>
                  <span className="text-sm font-semibold text-gray-800 break-all">
                    {data.nisn || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">No. KK</span>
                  <span className="text-sm font-semibold text-gray-800 break-all">
                    {data.noKk || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Agama</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {data.agama || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profil Keluarga & Pribadi */}
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <HeartHandshake size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Profil Keluarga & Minat
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div>
                  <span className="text-[11px] text-gray-400 block">
                    Posisi Dalam Keluarga
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    Anak ke-{data.anakKe ?? "-"} dari {data.jumlahSaudara ?? "-"} saudara
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">
                    Hobi & Cita-cita
                  </span>
                  <span className="text-sm font-semibold text-gray-800 break-words">
                    {data.hobi || "-"} / {data.citaCita || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Riwayat Kesehatan (opsional display) */}
          {data.penyakit && (
            <div className="p-3 sm:p-4 bg-red-50/50 rounded-xl border border-red-100 flex items-start gap-3">
              <Heart size={18} className="text-red-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-red-400 font-bold">
                  Riwayat Kesehatan / Penyakit
                </p>
                <p className="text-sm font-semibold text-red-900 mt-0.5 break-words">
                  {data.penyakit}
                </p>
              </div>
            </div>
          )}

          {/* Domisili & Tempat Tinggal */}
          <div className="p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-3">
            <Home size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Domisili & Tempat Tinggal
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
                {data.alamat || "-"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-200/60">
                <div>
                  <span className="text-[11px] text-gray-400 block">
                    Tinggal Bersama
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {getLabelById(tinggalBersamaOptions, data.tinggalBersamaId)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">
                    Status Kepemilikan Rumah
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {getLabelById(statusRumahOptions, data.statusRumahId)}
                  </span>
                </div>
              </div>
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
            Langkah pengisian biodata detail ini selesai dicatat oleh sistem.
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
          <UserCheck className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight leading-snug">
            Lengkapi Biodata Detail
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Isi formulir rincian data diri siswa sesuai dokumen resmi.
          </p>
        </div>
      </div>

      {/* Komponen Form */}
      <BiodataSiswaDetailForm
        data={data}
        statusRumahOptions={statusRumahOptions}
        tinggalBersamaOptions={tinggalBersamaOptions}
        action={action}
        isPending={isPending}
        state={state}
      />

      {/* Warning Info */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-50/70 border border-amber-100/80 rounded-xl mt-1">
        <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed font-medium">
          Pastikan data NISN dan No KK sesuai dengan dokumen fisik untuk menghindari pembatalan verifikasi.
        </p>
      </div>
    </div>
  );
}