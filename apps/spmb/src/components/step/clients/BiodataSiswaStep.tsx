"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, UserCheck, ShieldCheck, FileText, Home, HeartHandshake, AlertCircle } from "lucide-react";
import { Button, Radio } from "@bn/ui";
import { submitBiodataSiswaDetailAction } from "@/actions/biodata-siswa-detail.actions";
import type { MasterData } from "@bn/types";
import type { BiodataSiswaDetailResultData } from "@/services/biodata-siswa-detail";

export interface BiodataSiswaDetailData {
  nisn: string;
  no_kk: string;
  agama: string;
  anak_ke: number;
  jumlah_saudara: number;
  hobi: string;
  cita_cita: string;
  penyakit?: string | null;
  alamat: string;
  tinggal_bersama_id: number;
  status_rumah_id: number;
}

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

  const [formData, setFormData] = useState({
    nisn: data?.nisn || "",
    noKk: data?.no_kk || "",
    agama: data?.agama || "ISLAM",
    anakKe: data?.anak_ke || 1,
    jumlahSaudara: data?.jumlah_saudara || 0,
    hobi: data?.hobi || "",
    citaCita: data?.cita_cita || "",
    penyakit: data?.penyakit || "",
    alamat: data?.alamat || "",
    tinggalBersamaId: data?.tinggal_bersama_id || tinggalBersamaOptions[0]?.value || 1,
    statusRumahId: data?.status_rumah_id || statusRumahOptions[0]?.value || 1,
  });

  // Integrasi Server Action dengan useActionState
  const [state, action, isPending] = useActionState(
    async () => {
      return await submitBiodataSiswaDetailAction({
        formId: pendaftaran_id,
        rawPayload: formData,
      });
    },
    null
  );

  // Revalidate / Refresh ketika submit berhasil
  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  // Sanitasi angka untuk NISN & No. KK
  const handleNumericInput = (value: string, maxLength: number) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  };

  // Mencegah input karakter minus (-), plus (+), e, atau titik pada input number
  const preventInvalidNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Pengecekan keamanan level UI sebelum submit
  const isNisnValid = formData.nisn.length === 10;
  const isNoKkValid = formData.noKk.length === 16;
  const isFormValid = isNisnValid && isNoKkValid && formData.alamat.trim() !== "";

  // Helper untuk mendapatkan label dari options berdasarkan ID
  const getLabelById = (options: MasterData[], id: number) => {
    return options.find((opt) => opt.value === id)?.label || "-";
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

        <form action={action} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input NISN */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">NISN</label>
                <span className={`text-[10px] ${formData.nisn.length === 10 ? "text-green-600 font-medium" : "text-gray-400"}`}>
                  {formData.nisn.length}/10 digit
                </span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={10}
                value={formData.nisn}
                onChange={(e) =>
                  setFormData({ ...formData, nisn: handleNumericInput(e.target.value, 10) })
                }
                className={`w-full text-sm p-3 rounded-xl border focus:outline-none transition-colors ${
                  formData.nisn && !isNisnValid
                    ? "border-red-300 focus:border-red-500 bg-red-50/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="0012345678"
              />
              {formData.nisn && !isNisnValid && (
                <p className="text-[10px] text-red-500 mt-1">NISN harus tepat 10 digit angka.</p>
              )}
            </div>

            {/* Input No. KK */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">Nomor KK</label>
                <span className={`text-[10px] ${formData.noKk.length === 16 ? "text-green-600 font-medium" : "text-gray-400"}`}>
                  {formData.noKk.length}/16 digit
                </span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={16}
                value={formData.noKk}
                onChange={(e) =>
                  setFormData({ ...formData, noKk: handleNumericInput(e.target.value, 16) })
                }
                className={`w-full text-sm p-3 rounded-xl border focus:outline-none transition-colors ${
                  formData.noKk && !isNoKkValid
                    ? "border-red-300 focus:border-red-500 bg-red-50/20"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="3201234567890001"
              />
              {formData.noKk && !isNoKkValid && (
                <p className="text-[10px] text-red-500 mt-1">Nomor KK harus tepat 16 digit angka.</p>
              )}
            </div>

            {/* Agama (Locked / Read-Only Default) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Agama</label>
              <input
                type="text"
                readOnly
                value={formData.agama}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Anak ke & Jumlah Saudara */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Anak Ke-</label>
                <input
                  type="number"
                  min={1}
                  required
                  onKeyDown={preventInvalidNumberKeys}
                  value={formData.anakKe}
                  onChange={(e) =>
                    setFormData({ ...formData, anakKe: Math.max(1, parseInt(e.target.value) || 1) })
                  }
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jml. Saudara</label>
                <input
                  type="number"
                  min={0}
                  required
                  onKeyDown={preventInvalidNumberKeys}
                  value={formData.jumlahSaudara}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlahSaudara: Math.max(0, parseInt(e.target.value) || 0) })
                  }
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Hobi */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hobi</label>
              <input
                type="text"
                required
                value={formData.hobi}
                onChange={(e) => setFormData({ ...formData, hobi: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Membaca"
              />
            </div>

            {/* Cita-cita */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Cita-cita</label>
              <input
                type="text"
                required
                value={formData.citaCita}
                onChange={(e) => setFormData({ ...formData, citaCita: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Insinyur"
              />
            </div>
          </div>

          {/* Penyakit */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Riwayat Penyakit (Optional)</label>
            <input
              type="text"
              value={formData.penyakit || ""}
              onChange={(e) => setFormData({ ...formData, penyakit: e.target.value })}
              className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Asma, Alergi (kosongkan jika tidak ada)"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap Siswa</label>
            <textarea
              required
              rows={3}
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Jl. Merdeka No. 123, RT 01/RW 02..."
            />
          </div>

          {/* Radio Group: Tinggal Bersama */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Tinggal Bersama</label>
            <div className="flex flex-wrap gap-3">
              {tinggalBersamaOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    formData.tinggalBersamaId === opt.value
                      ? "border-blue-500 bg-blue-50/50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Radio
                    name="tinggalBersamaId"
                    value={opt.value}
                    checked={formData.tinggalBersamaId === opt.value}
                    onChange={() => setFormData({ ...formData, tinggalBersamaId: opt.value })}
                    className="accent-blue-600 h-4 w-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Radio Group: Status Rumah */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Status Rumah</label>
            <div className="flex flex-wrap gap-3">
              {statusRumahOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    formData.statusRumahId === opt.value
                      ? "border-blue-500 bg-blue-50/50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Radio
                    name="statusRumahId"
                    value={opt.value}
                    checked={formData.statusRumahId === opt.value}
                    onChange={() => setFormData({ ...formData, statusRumahId: opt.value })}
                    className="accent-blue-600 h-4 w-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {state?.success === false && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-[1.5rem]">
              <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
              <p className="text-[11px] sm:text-xs text-red-800 leading-relaxed font-medium">
                {state.message}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            //disabled={isPending || !isFormValid} sengaja aku matikan dulu untuk tes apakah masih loop
            className="rounded-xl w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Menyimpan..." : "Simpan Biodata Detail"}
          </Button>
        </form>

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