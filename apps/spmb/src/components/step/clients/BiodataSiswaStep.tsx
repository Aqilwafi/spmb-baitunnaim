"use client";

import { useState } from "react";
import { CheckCircle2, UserCheck, Edit3, ShieldCheck, FileText, Home, HeartHandshake } from "lucide-react";
import { Button } from "@bn/ui";

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
  data: BiodataSiswaDetailData | null;
}

export default function BiodataSiswaDetailStep({
  pendaftaran_id,
  user_id,
  status,
  data,
}: BiodataSiswaDetailStepProps) {
  const [formData, setFormData] = useState<BiodataSiswaDetailData>({
    nisn: data?.nisn || "",
    no_kk: data?.no_kk || "",
    agama: data?.agama || "ISLAM",
    anak_ke: data?.anak_ke || 1,
    jumlah_saudara: data?.jumlah_saudara || 0,
    hobi: data?.hobi || "",
    cita_cita: data?.cita_cita || "",
    penyakit: data?.penyakit || "",
    alamat: data?.alamat || "",
    tinggal_bersama_id: data?.tinggal_bersama_id || 1,
    status_rumah_id: data?.status_rumah_id || 1,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Panggil Server Action atau API untuk simpan data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submit Biodata Detail:", { pendaftaran_id, user_id, formData });
    setSubmitting(false);
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
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Domisili</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.alamat}</p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">NISN</label>
              <input
                type="text"
                required
                value={formData.nisn}
                onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="0012345678"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor KK</label>
              <input
                type="text"
                required
                value={formData.no_kk}
                onChange={(e) => setFormData({ ...formData, no_kk: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="3201234567890001"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Agama</label>
              <select
                value={formData.agama}
                onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="ISLAM">ISLAM</option>
                <option value="PROTESTAN">PROTESTAN</option>
                <option value="KATOLIK">KATOLIK</option>
                <option value="HINDU">HINDU</option>
                <option value="BUDDHA">BUDDHA</option>
                <option value="KHONGHUCU">KHONGHUCU</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Anak Ke-</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formData.anak_ke}
                  onChange={(e) => setFormData({ ...formData, anak_ke: Number(e.target.value) })}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jml. Saudara</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={formData.jumlah_saudara}
                  onChange={(e) => setFormData({ ...formData, jumlah_saudara: Number(e.target.value) })}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Cita-cita</label>
              <input
                type="text"
                required
                value={formData.cita_cita}
                onChange={(e) => setFormData({ ...formData, cita_cita: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Insinyur"
              />
            </div>
          </div>

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

          <Button type="submit" disabled={submitting} className="rounded-xl w-full sm:w-auto">
            {submitting ? "Menyimpan..." : "Simpan Biodata Detail"}
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