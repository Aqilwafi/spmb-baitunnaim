"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button, Radio } from "@bn/ui";
import type { MasterData } from "@bn/types";
import type { BiodataSiswaDetailResultData } from "@/services/biodata-siswa-detail";

interface BiodataSiswaDetailFormProps {
  data: BiodataSiswaDetailResultData | null;
  statusRumahOptions: MasterData[];
  tinggalBersamaOptions: MasterData[];
  action: (formData: FormData) => void;
  isPending: boolean;
  state: any;
}

export function BiodataSiswaDetailForm({
  data,
  statusRumahOptions,
  tinggalBersamaOptions,
  action,
  isPending,
  state,
}: BiodataSiswaDetailFormProps) {
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

  const handleNumericInput = (value: string, maxLength: number) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  };

  const preventInvalidNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const isNisnValid = formData.nisn.length === 10;
  const isNoKkValid = formData.noKk.length === 16;
  const isFormValid = isNisnValid && isNoKkValid && formData.alamat.trim() !== "";

  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  return (
    <form action={action} className="space-y-4">
      {/* Pesan Error Global */}
      {state?.success === false && state?.message && (
        <div className="flex items-start gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
          <p className="text-xs text-red-600 font-medium leading-relaxed">
            {state.message}
          </p>
        </div>
      )}

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
            name="nisn"
            inputMode="numeric"
            required
            maxLength={10}
            value={formData.nisn}
            onChange={(e) => setFormData({ ...formData, nisn: handleNumericInput(e.target.value, 10) })}
            className={`w-full text-sm p-3 rounded-xl border focus:outline-none transition-colors ${
              (formData.nisn && !isNisnValid) || state?.errors?.nisn
                ? "border-red-300 focus:border-red-500 bg-red-50/20"
                : "border-gray-200 focus:border-blue-500"
            }`}
            placeholder="0012345678"
          />
          {formData.nisn && !isNisnValid && (
            <p className="text-[10px] text-red-500 mt-1">NISN harus tepat 10 digit angka.</p>
          )}
          {renderFieldError(state?.errors?.nisn)}
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
            name="noKk"
            inputMode="numeric"
            required
            maxLength={16}
            value={formData.noKk}
            onChange={(e) => setFormData({ ...formData, noKk: handleNumericInput(e.target.value, 16) })}
            className={`w-full text-sm p-3 rounded-xl border focus:outline-none transition-colors ${
              (formData.noKk && !isNoKkValid) || state?.errors?.noKk
                ? "border-red-300 focus:border-red-500 bg-red-50/20"
                : "border-gray-200 focus:border-blue-500"
            }`}
            placeholder="3201234567890001"
          />
          {formData.noKk && !isNoKkValid && (
            <p className="text-[10px] text-red-500 mt-1">Nomor KK harus tepat 16 digit angka.</p>
          )}
          {renderFieldError(state?.errors?.noKk)}
        </div>

        {/* Agama */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Agama</label>
          <input
            type="text"
            name="agama"
            readOnly
            value={formData.agama}
            className="w-full text-sm p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium cursor-not-allowed focus:outline-none"
          />
          {renderFieldError(state?.errors?.agama)}
        </div>

        {/* Anak ke & Jumlah Saudara */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Anak Ke-</label>
            <input
              type="number"
              name="anakKe"
              min={1}
              required
              onKeyDown={preventInvalidNumberKeys}
              value={formData.anakKe}
              onChange={(e) => setFormData({ ...formData, anakKe: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
            />
            {renderFieldError(state?.errors?.anakKe)}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Jml. Saudara</label>
            <input
              type="number"
              name="jumlahSaudara"
              min={0}
              required
              onKeyDown={preventInvalidNumberKeys}
              value={formData.jumlahSaudara}
              onChange={(e) => setFormData({ ...formData, jumlahSaudara: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
            />
            {renderFieldError(state?.errors?.jumlahSaudara)}
          </div>
        </div>

        {/* Hobi */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Hobi</label>
          <input
            type="text"
            name="hobi"
            required
            value={formData.hobi}
            onChange={(e) => setFormData({ ...formData, hobi: e.target.value })}
            className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Membaca"
          />
          {renderFieldError(state?.errors?.hobi)}
        </div>

        {/* Cita-cita */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Cita-cita</label>
          <input
            type="text"
            name="citaCita"
            required
            value={formData.citaCita}
            onChange={(e) => setFormData({ ...formData, citaCita: e.target.value })}
            className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Insinyur"
          />
          {renderFieldError(state?.errors?.citaCita)}
        </div>
      </div>

      {/* Penyakit */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Riwayat Penyakit (Optional)</label>
        <input
          type="text"
          name="penyakit"
          value={formData.penyakit || ""}
          onChange={(e) => setFormData({ ...formData, penyakit: e.target.value })}
          className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="Asma, Alergi (kosongkan jika tidak ada)"
        />
        {renderFieldError(state?.errors?.penyakit)}
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap Siswa</label>
        <textarea
          name="alamat"
          required
          rows={3}
          value={formData.alamat}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="Jl. Merdeka No. 123, RT 01/RW 02..."
        />
        {renderFieldError(state?.errors?.alamat)}
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
        {renderFieldError(state?.errors?.tinggalBersamaId)}
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
        {renderFieldError(state?.errors?.statusRumahId)}
      </div>

      <Button
        type="submit"
        disabled={isPending || !isFormValid}
        className="rounded-xl w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Menyimpan..." : "Simpan Biodata Detail"}
      </Button>
    </form>
  );
}