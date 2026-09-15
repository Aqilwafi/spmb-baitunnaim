"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Send, ShieldAlert, Lock, Calendar, UserCheck } from "lucide-react";
import { finalisasiPendaftaranAction } from "@/actions/pendaftaran/finalisasi";
import { StepContainerProps } from "@/types/step.types";
// Import komponen dari package UI Anda
import { Button, Checkbox } from "@bn/ui";
import { FormattedFinalisasi } from "@/features/pendaftaran/data/finalisasi";
import { formatDateId } from "@bn/utils";

interface FinalisasiStepProps extends StepContainerProps {
  data: FormattedFinalisasi | null; // Menerima data dari container server
  isFinal: Boolean;
}

export default function FinalisasiStep({
  formId,
  status,
  data,
  isFinal
}: FinalisasiStepProps) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await finalisasiPendaftaranAction({ formId });
    },
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  // Tampilan Read-Only (Status Complete & Data Tersedia)
  if (isFinal && data) {


    const admissionStatus = data.formattedAdmissionStatus ?? "PROCESS";

    return (
      <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
        <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                Pendaftaran Telah Difinalisasi
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Formulir pendaftaran Anda sudah dikirim dan sedang dalam proses verifikasi panitia.
              </p>
            </div>
          </div>

          {/* Informasi Detail Status Pendaftaran */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] flex items-start gap-3">
              <Calendar className="text-gray-500 mt-0.5 shrink-0" size={18} />
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Waktu Finalisasi</p>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">{formatDateId(data.finalizedAt)}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] flex items-start gap-3">
              <UserCheck className="text-gray-500 mt-0.5 shrink-0" size={18} />
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Status Seleksi</p>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">
                  {admissionStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-[1.5rem] flex items-start gap-3">
            <Lock className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              Data tidak dapat diubah kembali karena sudah dikunci. Silakan pantau status seleksi melalui dashboard Anda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Form / Aksi Finalisasi Aktif
  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-purple-100 p-2 rounded-full shrink-0">
            <Send className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Finalisasi Pendaftaran
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Periksa kembali seluruh data Anda dari Step 1 hingga 10 sebelum melakukan pengiriman akhir.
            </p>
          </div>
        </div>

        {/* Notifikasi Error jika validasi server/RPC gagal */}
        {state?.success === false && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="text-red-600 mt-0.5 shrink-0" size={18} />
            <div className="text-xs text-red-800 font-medium">
              <p className="font-bold mb-1">Gagal Memproses Finalisasi:</p>
              <p>{state.message || "Terjadi kesalahan, pastikan semua persyaratan terpenuhi."}</p>
            </div>
          </div>
        )}

        <form action={action} className="flex flex-col gap-6">
          {/* Checkbox Konfirmasi menggunakan komponen UI */}
          <div className="p-4 sm:p-5 bg-gray-50/80 border border-gray-100 rounded-[1.5rem] flex items-start gap-3">
            <Checkbox
              id="konfirmasi_data"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="konfirmasi_data" className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none font-medium">
              Saya menyatakan bahwa seluruh data diri, data keluarga, riwayat pendidikan, pembayaran, dan dokumen yang diunggah adalah benar dan sesuai dengan aslinya. Saya paham bahwa data yang sudah difinalisasi tidak dapat diubah kembali.
            </label>
          </div>

          {/* Tombol Submit menggunakan komponen Button UI */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={!isChecked}
              isLoading={isPending}
              className="text-xs sm:text-sm"
            >
              <Send size={16} /> Finalisasi & Kirim Pendaftaran
            </Button>
          </div>
        </form>

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldAlert className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan Anda sudah mengecek tab-tab sebelumnya. Tombol finalisasi hanya akan sukses jika bukti pembayaran sudah diunggah dan dokumen wajib lengkap.
          </p>
        </div>
      </div>
    </div>
  );
}