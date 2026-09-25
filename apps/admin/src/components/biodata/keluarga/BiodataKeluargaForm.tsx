// apps/admin/src/components/admin/BiodataKeluargaForm.tsx
"use client";

import { useState } from "react";
import { Button, Select, NikInput } from "@bn/ui"; // Mengimpor Select dari @bn/ui
import type { MasterData } from "@bn/types";
import type { FormattedListKeluarga } from "@/features/biodata/keluarga";

interface BiodataKeluargaFormProps {
  initialData?: FormattedListKeluarga | null;
  isEdit?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  relationList?: MasterData[]; // Menggunakan tipe MasterData[]
}

export function BiodataKeluargaForm({ 
  initialData, 
  isEdit = false, 
  onSubmit, 
  onCancel,
  relationList = [] 
}: BiodataKeluargaFormProps) {
  const [formData, setFormData] = useState({
    namaLengkap: initialData?.namaLengkap || "",
    relasi: initialData?.relasi || "",
    detailRelasi: initialData?.detailRelasi || "",
    namaSiswa: initialData?.namaSiswa || "",
    statusHidup: initialData?.statusHidup || "HIDUP",
    nik: initialData?.nik || "",
    nomorHp: initialData?.nomorHp || "",
    tempatLahir: initialData?.tempatLahir || "",
    tanggalLahir: initialData?.tanggalLahir || "",
    pekerjaan: initialData?.pekerjaan || "",
    pendidikanTerakhir: initialData?.pendidikanTerakhir || "",
    penghasilan: initialData?.penghasilan || "",
    alamat: initialData?.alamat || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Jika relasi diubah dan bukan "WALI", kosongkan detailRelasi
      if (name === "relasi" && value !== "WALI") {
        updated.detailRelasi = "";
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const isReadOnly = !isEdit;
  
  // Detail relasi hanya bisa diedit jika mode edit aktif DAN relasinya adalah "WALI"
  const isDetailRelasiReadOnly = isReadOnly || formData.relasi !== "WALI";

  const inputClassName = (readOnly: boolean) => `
    w-full px-3.5 py-2 rounded-xl border text-sm transition-colors
    ${readOnly 
      ? "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed" 
      : "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
    }
  `;

  // Fallback data default jika relationList dari parent kosong
  const defaultRelationList: MasterData[] = [
    { value: 1, label: "AYAH", code: "AYAH" },
    { value: 2, label: "IBU", code: "IBU" },
    { value: 3, label: "WALI", code: "WALI" },
  ];

  const activeRelationList = relationList.length > 0 ? relationList : defaultRelationList;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Baris 1: Nama Lengkap, Nama Siswa, Relasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Nama Anggota Keluarga
          </label>
          <input
            type="text"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Nama Siswa
          </label>
          <input
            type="text"
            name="namaSiswa"
            value={formData.namaSiswa}
            readOnly
            className={inputClassName(true)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Relasi
          </label>
          <Select
            name="relasi"
            value={formData.relasi}
            onChange={handleChange}
            disabled={isReadOnly}
            placeholder={formData.relasi}
            options={activeRelationList}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* Baris 2: Detail Relasi, Status Hidup, NIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Detail Relasi
          </label>
          <input
            type="text"
            name="detailRelasi"
            value={formData.detailRelasi}
            onChange={handleChange}
            readOnly={isDetailRelasiReadOnly}
            className={inputClassName(isDetailRelasiReadOnly)}
            placeholder={formData.relasi === "WALI" ? "Cth: Kakek / Bibi" : "Hanya untuk relasi Wali"}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status Hidup
          </label>
          {/* Anda juga bisa mengubah select statusHidup jika sudah ada komponen Select khusus */}
          <select
            name="statusHidup"
            value={formData.statusHidup}
            onChange={handleChange}
            disabled={isReadOnly}
            className={inputClassName(isReadOnly)}
          >
            <option value="HIDUP">HIDUP</option>
            <option value="MENINGGAL">MENINGGAL</option>
            <option value="LAINNYA">LAINNYA</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
    NIK
  </label>
  <NikInput
    name="nik"
    value={formData.nik}
    onChange={handleChange}
    readOnly={isReadOnly}
  />
</div>
      </div>

      {/* Baris 3: Nomor HP, Tempat Lahir, Tanggal Lahir */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Nomor HP
          </label>
          <input
            type="text"
            name="nomorHp"
            value={formData.nomorHp}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Tempat Lahir
          </label>
          <input
            type="text"
            name="tempatLahir"
            value={formData.tempatLahir}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Tanggal Lahir
          </label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* Baris 4: Pekerjaan, Pendidikan Terakhir, Penghasilan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Pekerjaan
          </label>
          <input
            type="text"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Pendidikan Terakhir
          </label>
          <input
            type="text"
            name="pendidikanTerakhir"
            value={formData.pendidikanTerakhir}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Penghasilan
          </label>
          <input
            type="text"
            name="penghasilan"
            value={formData.penghasilan}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* Baris 5: Alamat (Full Width) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Alamat
        </label>
        <textarea
          name="alamat"
          rows={2}
          value={formData.alamat}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={inputClassName(isReadOnly)}
          placeholder="Alamat lengkap..."
        />
      </div>

      {/* Tombol Aksi */}
      {isEdit && (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-sm"
          >
            Simpan Perubahan
          </Button>
        </div>
      )}
    </form>
  );
}