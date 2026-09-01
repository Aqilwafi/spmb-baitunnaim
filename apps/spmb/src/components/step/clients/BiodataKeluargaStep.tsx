"use client";

import { useState } from "react";
import { CheckCircle2, User, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@bn/ui";

export type RelationType = "AYAH" | "IBU" | "WALI";
export type LifeStatus = "HIDUP" | "MENINGGAL";

export interface BiodataKeluargaItemData {
  relation_type: RelationType;
  detail_relation_type?: string | null;
  nama_lengkap: string;
  nik?: string | null;
  status_hidup: LifeStatus;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  pekerjaan?: string | null;
  pendidikan_terakhir?: string | null;
  penghasilan?: string | null;
  no_hp?: string | null;
  alamat?: string | null;
}

interface BiodataKeluargaStepProps {
  pendaftaran_id: string;
  user_id: string;
  status: "active" | "complete";
  relationType: RelationType;
  data: BiodataKeluargaItemData | null;
  isWaliMandatory?: boolean; // 👈 Prop kondisi dari server
}

export default function BiodataKeluargaStep({
  pendaftaran_id,
  user_id,
  status,
  relationType,
  data,
  isWaliMandatory = false,
}: BiodataKeluargaStepProps) {
  const [skipWali, setSkipWali] = useState(false);
  const [formData, setFormData] = useState<BiodataKeluargaItemData>({
    relation_type: relationType,
    detail_relation_type: data?.detail_relation_type || "",
    nama_lengkap: data?.nama_lengkap || "",
    nik: data?.nik || "",
    status_hidup: data?.status_hidup || "HIDUP",
    tempat_lahir: data?.tempat_lahir || "",
    tanggal_lahir: data?.tanggal_lahir || "",
    pekerjaan: data?.pekerjaan || "",
    pendidikan_terakhir: data?.pendidikan_terakhir || "",
    penghasilan: data?.penghasilan || "",
    no_hp: data?.no_hp || "",
    alamat: data?.alamat || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const isHidup = formData.status_hidup === "HIDUP";
  const labelMap = {
    AYAH: "Ayah",
    IBU: "Ibu",
    WALI: "Wali",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Panggil Server Action untuk menyimpan data / status skip wali
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submit Biodata Keluarga Single:", {
      pendaftaran_id,
      user_id,
      relationType,
      skipWali: relationType === "WALI" ? skipWali : false,
      formData: skipWali ? null : formData,
    });
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
                Biodata {labelMap[relationType]}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Data {labelMap[relationType].toLowerCase()} telah tersimpan di sistem.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                {data.relation_type} {data.detail_relation_type && `(${data.detail_relation_type})`}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  data.status_hidup === "HIDUP"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.status_hidup}
              </span>
            </div>

            <p className="text-sm font-bold text-gray-800">{data.nama_lengkap}</p>

            {data.status_hidup === "HIDUP" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200/60">
                <p><span className="text-gray-400">NIK:</span> {data.nik}</p>
                <p><span className="text-gray-400">No. HP:</span> {data.no_hp}</p>
                <p><span className="text-gray-400">Pekerjaan:</span> {data.pekerjaan}</p>
                <p><span className="text-gray-400">Pendidikan:</span> {data.pendidikan_terakhir}</p>
                <p><span className="text-gray-400">Penghasilan:</span> {data.penghasilan}</p>
                <p className="sm:col-span-2"><span className="text-gray-400">Alamat:</span> {data.alamat || "-"}</p>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
            <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
              Data tidak dapat diubah secara mandiri. Hubungi panitia pendaftaran jika ada pembaruan data.
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
            <User className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Isi Biodata {labelMap[relationType]}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Lengkapi formulir data {labelMap[relationType].toLowerCase()} sesuai dengan identitas resmi.
            </p>
          </div>
        </div>

        {/* 🌟 BANNER KHUSUS WALI 🌟 */}
        {relationType === "WALI" && (
          <div className="mb-6">
            {isWaliMandatory ? (
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">Anda Wajib Mengisi Data Wali</p>
                  <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                    Berdasarkan kriteria pendaftaran Anda, pengisian data wali bersifat wajib dan tidak dapat dilewati.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <label htmlFor="skip-wali-checkbox" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none">
                  Saya memilih untuk tidak mengisi data wali
                </label>
                <input
                  id="skip-wali-checkbox"
                  type="checkbox"
                  checked={skipWali}
                  onChange={(e) => setSkipWali(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        )}

        {/* FORM / TOMBOL SKIP */}
        {relationType === "WALI" && skipWali ? (
          <div className="p-6 bg-blue-50/60 border border-blue-100 rounded-2xl text-center space-y-3">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              Anda memilih untuk melewatinya. Klik tombol di bawah untuk menyimpan pilihan ini dan melanjutkan.
            </p>
            <Button onClick={handleSubmit} disabled={submitting} className="rounded-xl">
              {submitting ? "Menyimpan..." : "Konfirmasi & Lewati Step Wali"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="text-xs font-semibold text-gray-700">Status Keberadaan:</label>
                <select
                value={formData.status_hidup}
                onChange={(e) => setFormData({ ...formData, status_hidup: e.target.value as LifeStatus })}
                className="text-xs p-2 rounded-lg border border-gray-300 bg-white font-medium"
                >
                <option value="HIDUP">HIDUP</option>
                {/* Sembunyikan opsi MENINGGAL jika tipe hubungan adalah WALI */}
                {relationType !== "WALI" && (
                    <option value="MENINGGAL">MENINGGAL</option>
                )}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relationType === "WALI" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Hubungan Wali</label>
                  <input
                    type="text"
                    required
                    value={formData.detail_relation_type || ""}
                    onChange={(e) => setFormData({ ...formData, detail_relation_type: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Contoh: Kakek, Paman"
                  />
                </div>
              )}

              <div className={relationType === "WALI" ? "" : "sm:col-span-2"}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.nama_lengkap}
                  onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="Sesuai KTP"
                />
              </div>

              {isHidup && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">NIK</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.nik || ""}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="3201234567890001"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">No. HP / WhatsApp</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.no_hp || ""}
                      onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="081234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tempat Lahir</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.tempat_lahir || ""}
                      onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      required={isHidup}
                      value={formData.tanggal_lahir || ""}
                      onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Pendidikan Terakhir</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.pendidikan_terakhir || ""}
                      onChange={(e) => setFormData({ ...formData, pendidikan_terakhir: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="SMA / S1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Pekerjaan</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.pekerjaan || ""}
                      onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="Karyawan Swasta"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Penghasilan Bulanan</label>
                    <input
                      type="text"
                      required={isHidup}
                      value={formData.penghasilan || ""}
                      onChange={(e) => setFormData({ ...formData, penghasilan: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="Rp 3.000.000 - Rp 5.000.000"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Tempat Tinggal</label>
                    <textarea
                      rows={2}
                      value={formData.alamat || ""}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="Kosongkan jika sama dengan alamat domisili siswa"
                    />
                  </div>
                </>
              )}
            </div>

            <Button type="submit" disabled={submitting} className="rounded-xl w-full sm:w-auto">
              {submitting ? "Menyimpan..." : `Simpan Biodata ${labelMap[relationType]}`}
            </Button>
          </form>
        )}

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan NIK dan data diri {labelMap[relationType].toLowerCase()} sudah benar sebelum melanjutkan ke langkah berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}