"use client";

import { useState } from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@bn/ui";
import type { RelationType, LifeStatus, BiodataKeluargaItemData } from "@/components/step/clients/BiodataKeluargaStep";

interface BiodataKeluargaFormProps {
  relationType: RelationType;
  data: BiodataKeluargaItemData | null;
  isWaliMandatory?: boolean;
  action: (formData: FormData) => void;
  isPending: boolean;
  state: any;
}

export function BiodataKeluargaForm({
  relationType,
  data,
  isWaliMandatory = false,
  action,
  isPending,
  state,
}: BiodataKeluargaFormProps) {
  const [skipWali, setSkipWali] = useState(false);
  const [statusHidup, setStatusHidup] = useState<LifeStatus>(data?.status_hidup || "HIDUP");
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

  const isHidup = statusHidup === "HIDUP";
  const labelMap: Record<RelationType, string> = {
    AYAH: "Ayah",
    IBU: "Ibu",
    WALI: "Wali",
  };

  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  return (
    <div className="space-y-4">
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
              <label
                htmlFor="skip-wali-checkbox"
                className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
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

      {/* OPSI SKIP WALI */}
      {relationType === "WALI" && skipWali ? (
        <form action={action} className="p-6 bg-blue-50/60 border border-blue-100 rounded-2xl text-center space-y-3">
          <input type="hidden" name="is_skipped" value="true" />
          <input type="hidden" name="relation_type" value="WALI" />
          <p className="text-xs sm:text-sm text-blue-800 font-medium">
            Anda memilih untuk melewatinya. Klik tombol di bawah untuk menyimpan pilihan ini dan melanjutkan.
          </p>
          <Button type="submit" disabled={isPending} className="rounded-xl">
            {isPending ? "Menyimpan..." : "Konfirmasi & Lewati Step Wali"}
          </Button>
        </form>
      ) : (
        /* FORM ISIAN BIASA */
        <form action={action} className="space-y-4">
          {/* Hidden Field untuk Relation Type */}
          <input type="hidden" name="relation_type" value={relationType} />

          {/* Pesan Error Global */}
          {state?.success === false && state?.message && (
            <div className="flex items-start gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
              <p className="text-xs text-red-600 font-medium leading-relaxed">{state.message}</p>
            </div>
          )}

          {/* Switch Status Hidup */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <label className="text-xs font-semibold text-gray-700">Status Keberadaan:</label>
            <select
              name="status_hidup"
              value={statusHidup}
              onChange={(e) => {
                const val = e.target.value as LifeStatus;
                setStatusHidup(val);
                setFormData({ ...formData, status_hidup: val });
              }}
              className="text-xs p-2 rounded-lg border border-gray-300 bg-white font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="HIDUP">HIDUP</option>
              {relationType !== "WALI" && <option value="MENINGGAL">MENINGGAL</option>}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Hubungan Wali */}
            {relationType === "WALI" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hubungan Wali</label>
                <input
                  type="text"
                  name="detail_relation_type"
                  required
                  value={formData.detail_relation_type || ""}
                  onChange={(e) => setFormData({ ...formData, detail_relation_type: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                  placeholder="Contoh: Kakek, Paman"
                />
                {renderFieldError(state?.errors?.detail_relation_type)}
              </div>
            )}

            {/* Input Nama Lengkap */}
            <div className={relationType === "WALI" ? "" : "sm:col-span-2"}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="nama_lengkap"
                required
                value={formData.nama_lengkap}
                onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Sesuai KTP"
              />
              {renderFieldError(state?.errors?.nama_lengkap)}
            </div>

            {/* Field Input jika Status Keberadaan HIDUP */}
            {isHidup && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">NIK</label>
                  <input
                    type="text"
                    name="nik"
                    required={isHidup}
                    maxLength={16}
                    value={formData.nik || ""}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="3201234567890001"
                  />
                  {renderFieldError(state?.errors?.nik)}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">No. HP / WhatsApp</label>
                  <input
                    type="text"
                    name="no_hp"
                    required={isHidup}
                    value={formData.no_hp || ""}
                    onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="081234567890"
                  />
                  {renderFieldError(state?.errors?.no_hp)}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    required={isHidup}
                    value={formData.tempat_lahir || ""}
                    onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                  {renderFieldError(state?.errors?.tempat_lahir)}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    required={isHidup}
                    value={formData.tanggal_lahir || ""}
                    onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                  {renderFieldError(state?.errors?.tanggal_lahir)}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pendidikan Terakhir</label>
                  <input
                    type="text"
                    name="pendidikan_terakhir"
                    required={isHidup}
                    value={formData.pendidikan_terakhir || ""}
                    onChange={(e) => setFormData({ ...formData, pendidikan_terakhir: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="SD / SMP / SMA"
                  />
                  {renderFieldError(state?.errors?.pendidikan_terakhir)}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pekerjaan</label>
                  <input
                    type="text"
                    name="pekerjaan"
                    required={isHidup}
                    value={formData.pekerjaan || ""}
                    onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Karyawan Swasta"
                  />
                  {renderFieldError(state?.errors?.pekerjaan)}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Penghasilan Bulanan</label>
                  <input
                    type="text"
                    name="penghasilan"
                    required={isHidup}
                    value={formData.penghasilan || ""}
                    onChange={(e) => setFormData({ ...formData, penghasilan: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Rp 3.000.000 - Rp 5.000.000"
                  />
                  {renderFieldError(state?.errors?.penghasilan)}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Tempat Tinggal</label>
                  <textarea
                    name="alamat"
                    rows={2}
                    value={formData.alamat || ""}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Kosongkan jika sama dengan alamat domisili siswa"
                  />
                  {renderFieldError(state?.errors?.alamat)}
                </div>
              </>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="rounded-xl w-full sm:w-auto">
            {isPending ? "Menyimpan..." : `Simpan Biodata ${labelMap[relationType]}`}
          </Button>
        </form>
      )}
    </div>
  );
}