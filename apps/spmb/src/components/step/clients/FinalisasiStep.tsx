"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Send,
  ShieldAlert,
  Lock,
  Calendar,
  Clock,
  HelpCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import { finalisasiPendaftaranAction } from "@/actions/pendaftaran/finalisasi";
import { StepContainerProps } from "@/types/step.types";
import { Button, Checkbox } from "@bn/ui";
import { FormattedFinalisasi } from "@/features/pendaftaran/data/finalisasi";
import { formatDateId } from "@bn/utils";

export type EnumStatusAdmisi = "PROCESS" | "AWAITING" | "ACCEPTED" | "REJECTED";

interface FinalisasiStepProps extends StepContainerProps {
  data: FormattedFinalisasi | null;
  isFinal: Boolean;
}

export default function FinalisasiStep({
  formId,
  data,
  isFinal,
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

  // ==========================================
  // TAMPILAN AFTER-FINALIZATION (READ-ONLY)
  // ==========================================
  if (isFinal && data) {
    const statusAdmisi = (data.admissionStatus ?? "PROCESS") as EnumStatusAdmisi;

    return (
      <div className="flex flex-col gap-4 animate-in fade-in duration-500">
        {/* Banner Status Admisi Utama (Satu-satunya Tampilan) */}
        {renderAdmissionBanner(statusAdmisi, data)}
      </div>
    );
  }

  // ==========================================
  // TAMPILAN FORM / AKSI FINALISASI (TANPA CARD)
  // ==========================================
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header Form */}
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2.5 rounded-2xl shrink-0">
          <Send className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
            Finalisasi Pendaftaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periksa kembali seluruh data Anda dari Step awal sebelum melakukan pengiriman akhir.
          </p>
        </div>
      </div>

      {/* Notifikasi Error */}
      {state?.success === false && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <ShieldAlert className="text-red-600 mt-0.5 shrink-0" size={18} />
          <div className="text-xs text-red-800 font-medium">
            <p className="font-bold mb-1">Gagal Memproses Finalisasi:</p>
            <p>{state.message || "Terjadi kesalahan, pastikan semua persyaratan terpenuhi."}</p>
          </div>
        </div>
      )}

      {/* Form Konfirmasi */}
      <form action={action} className="flex flex-col gap-6">
        <div className="p-4 sm:p-5 bg-gray-50/80 border border-gray-100 rounded-[1.5rem] flex items-start gap-3">
          <Checkbox
            id="konfirmasi_data"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="konfirmasi_data"
            className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none font-medium"
          >
            Saya menyatakan bahwa seluruh data diri, data keluarga, riwayat pendidikan, pembayaran, dan dokumen yang diunggah adalah benar dan sesuai dengan aslinya. Saya paham bahwa data yang sudah difinalisasi tidak dapat diubah kembali.
          </label>
        </div>

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

      {/* Warning Box */}
      <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem]">
        <ShieldAlert className="text-amber-600 mt-0.5 shrink-0" size={18} />
        <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
          Pastikan Anda sudah mengecek tab-tab sebelumnya. Tombol finalisasi hanya akan sukses jika bukti pembayaran dan berkas dokumen wajib telah terisi lengkap.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// RENDER BANNER STATUS + INFO DALAM 1 BLOK
// ==========================================

function renderAdmissionBanner(status: EnumStatusAdmisi, data: FormattedFinalisasi) {
  const finalizedDate = formatDateId(data.finalizedAt);

  switch (status) {
    case "ACCEPTED":
      return (
        <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white shadow-xl relative overflow-hidden space-y-6">
          <Sparkles className="absolute top-4 right-4 text-white/20 w-32 h-32 -mr-6 -mt-6 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <CheckCircle2 size={14} /> DITERIMA / LULUS SELEKSI
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              Selamat! Anda Dinyatakan Diterima 🎉
            </h2>
            <p className="text-xs sm:text-sm text-green-50 max-w-2xl leading-relaxed">
              Selamat bergabung! Seluruh berkas pendaftaran Anda telah diverifikasi dan dinyatakan **Lulus**. Silakan unduh Bukti Penerimaan atau lanjutkan ke alur Daftar Ulang.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-green-100">
                <Calendar size={14} /> Waktu Submit: <strong className="text-white">{finalizedDate}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-green-100">
                <Lock size={14} /> Data Terkunci
              </span>
            </div>
          </div>
        </div>
      );

    case "AWAITING":
      return (
        <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <HelpCircle size={14} /> STATUS CADANGAN / DALAM ANTREAN
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Masuk Dalam Antrean (Awaiting List)
            </h2>
            <p className="text-xs sm:text-sm text-amber-50 max-w-2xl leading-relaxed">
              Pendaftaran Anda telah memenuhi kualifikasi dasar, namun saat ini berada di **Daftar Cadangan (Waiting List)** menunggu ketersediaan kuota/gelombang berikutnya.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-amber-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> Waktu Submit: <strong className="text-white">{finalizedDate}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} /> Data Terkunci
            </span>
          </div>
        </div>
      );

    case "REJECTED":
      return (
        <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-slate-800 via-rose-950 to-red-900 text-white shadow-lg space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/30 border border-red-400/30 text-xs font-semibold text-red-200">
              <XCircle size={14} /> TIDAK DITERIMA
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Mohon Maaf, Anda Belum Dinyatakan Lulus
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/80 max-w-2xl leading-relaxed">
              Terima kasih telah berpartisipasi dalam seleksi pendaftaran ini. Berdasarkan hasil evaluasi berkas dan kriteria seleksi, pendaftaran Anda saat ini **belum dapat diterima**.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-rose-200/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> Waktu Submit: <strong className="text-white">{finalizedDate}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} /> Data Terkunci
            </span>
          </div>
        </div>
      );

    case "PROCESS":
    default:
      return (
        <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <Clock size={14} /> SEDANG DIPROSES / VERIFIKASI
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Pendaftaran Berhasil Terkirim!
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Formulir dan berkas dokumen Anda telah diterima oleh sistem dan sedang berada dalam tahap pengujian/verifikasi oleh panitia SPMB. Silakan pantau halaman ini secara berkala.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> Waktu Submit: <strong className="text-white">{finalizedDate}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} /> Data Terkunci
            </span>
          </div>
        </div>
      );
  }
}