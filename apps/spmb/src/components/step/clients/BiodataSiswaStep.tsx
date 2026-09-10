"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, UserCheck, ShieldCheck, FileText, Home, HeartHandshake } from "lucide-react";
import { submitBiodataSiswaDetailAction } from "@/actions/biodata-siswa-detail.actions";
import { BiodataSiswaDetailForm } from "@/components/forms/BiodataSiswaDetailForm";
import type { MasterData } from "@bn/types";
import type { BiodataSiswaDetailResultData } from "@/services/biodata-siswa-detail";

interface BiodataSiswaDetailStepProps {
  pendaftaran_id: string;
  user_id: string;
  status: "active" | "complete";
  data: BiodataSiswaDetailResultData | null;
  statusRumahOptions: MasterData[];
  tinggalBersamaOptions: MasterData[];
}

export default function BiodataSiswaDetailStep({
  pendaftaran_id,
  status,
  data,
  statusRumahOptions,
  tinggalBersamaOptions,
}: BiodataSiswaDetailStepProps) {
  const router = useRouter();
  const isSubmittedRef = useRef(false);

  const [state, action, isPending] = useActionState(
    async (prevState: any, formPayload: FormData) => {
      isSubmittedRef.current = true;
      return await submitBiodataSiswaDetailAction({
        formId: pendaftaran_id,
        rawPayload: Object.fromEntries(formPayload),
      });
    },
    null
  );

  useEffect(() => {
    if (isSubmittedRef.current && state?.success) {
      isSubmittedRef.current = false;
      router.refresh();
    }
  }, [state, router]);

  const getLabelById = (options: MasterData[], id: number) => {
    return options.find((opt) => opt.value === id)?.label || "-";
  };

  // Tampilan Read-Only (Status Complete)
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
                Biodata Detail Siswa
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Data rincian siswa telah berhasil tersimpan di sistem.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <FileText size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Identitas</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">NISN: {data.nisn}</p>
                <p className="text-xs text-gray-600">No. KK: {data.no_kk}</p>
                <p className="text-xs text-gray-600">Agama: {data.agama}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
              <HeartHandshake size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Profil Keluarga & Pribadi</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">Anak ke-{data.anak_ke} dari {data.jumlah_saudara} saudara</p>
                <p className="text-xs text-gray-600">Hobi: {data.hobi} | Cita-cita: {data.cita_cita}</p>
                {data.penyakit && <p className="text-xs text-red-500">Riwayat Penyakit: {data.penyakit}</p>}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3 md:col-span-2">
              <Home size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Domisili & Tempat Tinggal</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.alamat}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Tinggal Bersama: <span className="font-medium text-gray-800">{getLabelById(tinggalBersamaOptions, data.tinggal_bersama_id)}</span>
                </p>
                <p className="text-xs text-gray-600">
                  Status Rumah: <span className="font-medium text-gray-800">{getLabelById(statusRumahOptions, data.status_rumah_id)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
            <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
              Data yang dikirimkan bersifat permanen. Jika ada perubahan data penting, silakan hubungi admin sekolah.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Form Input (Status Active)
  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-blue-100 p-2 rounded-full shrink-0">
            <UserCheck className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Lengkapi Biodata Detail
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Isi formulir rincian data diri siswa sesuai dokumen resmi.
            </p>
          </div>
        </div>

        <BiodataSiswaDetailForm
          data={data}
          statusRumahOptions={statusRumahOptions}
          tinggalBersamaOptions={tinggalBersamaOptions}
          action={action}
          isPending={isPending}
          state={state}
        />

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan data NISN dan No KK sesuai dengan dokumen fisik untuk menghindari pembatalan verifikasi.
          </p>
        </div>
      </div>
    </div>
  );
}