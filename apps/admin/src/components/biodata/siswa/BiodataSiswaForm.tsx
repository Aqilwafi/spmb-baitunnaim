// apps/admin/src/components/admin/BiodataSiswaForm.tsx
"use client";

import { useState } from "react";
import { Button, Select, NikInput } from "@bn/ui";
import type { MasterData } from "@bn/types";
import type { FormattedListSiswa } from "@/features/biodata/siswa";

interface BiodataSiswaFormProps {
  initialData?: FormattedListSiswa | null;
  isEdit?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  lembagaList?: MasterData[];
  kelasList?: MasterData[];
  statusRumahList?: MasterData[];
  tinggalBersamaList?: MasterData[];
}

const inputClassName = (readOnly: boolean) => `
  w-full px-3.5 py-2 rounded-xl border text-sm transition-colors
  ${readOnly 
    ? "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed" 
    : "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
  }
`;

// ==========================================
// 1. KOMPONEN: BIO UTAMA
// ==========================================
function BioUtamaSection({ formData, onChange, isReadOnly, lembagaList, kelasList }: any) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Informasi Utama Siswa</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Lengkap</label>
          <input
            type="text"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
            placeholder="Masukkan nama lengkap siswa"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={onChange}
            disabled={isReadOnly}
            className={inputClassName(isReadOnly)}
          >
            <option value="MALE">Laki-laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Agama</label>
          <input
            type="text"
            name="agama"
            value={formData.agama}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">NISN</label>
          <input
            type="text"
            name="nisn"
            value={formData.nisn}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">NIK</label>
          <NikInput
            name="nik"
            value={formData.nik}
            onChange={onChange}
            readOnly={isReadOnly}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">No. KK</label>
          <input
            type="text"
            name="noKk"
            value={formData.noKk}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tempat Lahir</label>
          <input
            type="text"
            name="tempatLahir"
            value={formData.tempatLahir}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Lembaga & Kelas</label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              name="lembagaId"
              value={formData.lembagaId}
              onChange={onChange}
              disabled={isReadOnly}
              options={lembagaList}
              className={inputClassName(isReadOnly)}
            />
            <Select
              name="kelasId"
              value={formData.kelasId}
              onChange={onChange}
              disabled={isReadOnly}
              options={kelasList}
              className={inputClassName(isReadOnly)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN: KELUARGA (Selalu ReadOnly di kedua mode)
// ==========================================
function KeluargaSection({ formData, onChange }: any) {
  const isKeluargaReadOnly = true; 

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-bold text-gray-800">Informasi Keluarga (Read-Only)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Ayah</label>
          <input
            type="text"
            name="namaAyah"
            value={formData.namaAyah}
            onChange={onChange}
            readOnly={isKeluargaReadOnly}
            className={inputClassName(isKeluargaReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Ibu</label>
          <input
            type="text"
            name="namaIbu"
            value={formData.namaIbu}
            onChange={onChange}
            readOnly={isKeluargaReadOnly}
            className={inputClassName(isKeluargaReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Wali (Opsional)</label>
          <input
            type="text"
            name="namaWali"
            value={formData.namaWali}
            onChange={onChange}
            readOnly={isKeluargaReadOnly}
            className={inputClassName(isKeluargaReadOnly)}
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. KOMPONEN: BIO DETAIL (Termasuk Penyakit & Catatan)
// ==========================================
function BioDetailSection({ formData, onChange, isReadOnly, statusRumahList, tinggalBersamaList }: any) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Detail Pribadi Siswa</h3>

      {/* POSISI BARIS 1: Tinggal Bersama & Status Rumah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tinggal Bersama</label>
          <Select
            name="tinggalBersamaId"
            value={formData.tinggalBersamaId}
            onChange={onChange}
            disabled={isReadOnly}
            options={tinggalBersamaList}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status Rumah</label>
          <Select
            name="statusRumahId"
            value={formData.statusRumahId}
            onChange={onChange}
            disabled={isReadOnly}
            options={statusRumahList}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* POSISI BARIS 2: Hobi, Cita-cita, Anak Ke-, Jumlah Saudara */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Hobi</label>
          <input
            type="text"
            name="hobi"
            value={formData.hobi}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Cita-cita</label>
          <input
            type="text"
            name="citaCita"
            value={formData.citaCita}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Anak Ke-</label>
          <input
            type="number"
            name="anakKe"
            value={formData.anakKe}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Jumlah Saudara</label>
          <input
            type="number"
            name="jumlahSaudara"
            value={formData.jumlahSaudara}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* Penyakit */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Riwayat Penyakit</label>
        <input
          type="text"
          name="penyakit"
          value={formData.penyakit}
          onChange={onChange}
          readOnly={isReadOnly}
          className={inputClassName(isReadOnly)}
          placeholder="Sebutkan jika ada riwayat penyakit khusus"
        />
      </div>

      {/* Alamat Tinggal Siswa */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Alamat Tinggal Siswa</label>
        <textarea
          name="alamat"
          rows={2}
          value={formData.alamat}
          onChange={onChange}
          readOnly={isReadOnly}
          className={inputClassName(isReadOnly)}
        />
      </div>

      {/* Catatan Siswa */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Catatan Tambahan Siswa</label>
        <textarea
          name="catatan"
          rows={2}
          value={formData.catatan}
          onChange={onChange}
          readOnly={isReadOnly}
          className={inputClassName(isReadOnly)}
        />
      </div>
    </div>
  );
}

// ==========================================
// 4. KOMPONEN: PENDIDIKAN SEBELUMNYA (Termasuk Catatan Pendidikan)
// ==========================================
function PendidikanSebelumnyaSection({ formData, onChange, isReadOnly }: any) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Riwayat Pendidikan Sebelumnya</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Sekolah Asal</label>
          <input
            type="text"
            name="namaSekolah"
            value={formData.namaSekolah}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">NPSN Sekolah Asal</label>
          <input
            type="text"
            name="npsn"
            value={formData.npsn}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tahun Lulus</label>
          <input
            type="number"
            name="tahunLulus"
            value={formData.tahunLulus}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nilai Rata-rata</label>
          <input
            type="number"
            step="0.01"
            name="nilaiRataRata"
            value={formData.nilaiRataRata}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Alamat Sekolah Asal</label>
          <input
            type="text"
            name="alamatSekolah"
            value={formData.alamatSekolah}
            onChange={onChange}
            readOnly={isReadOnly}
            className={inputClassName(isReadOnly)}
          />
        </div>
      </div>

      {/* Catatan Pendidikan Sebelumnya */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Catatan Pendidikan Sebelumnya</label>
        <textarea
          name="pendidikanCatatan"
          rows={2}
          value={formData.pendidikanCatatan}
          onChange={onChange}
          readOnly={isReadOnly}
          className={inputClassName(isReadOnly)}
        />
      </div>
    </div>
  );
}

// ==========================================
// UTAMA: BiodataSiswaForm
// ==========================================
export function BiodataSiswaForm({ 
  initialData, 
  isEdit = false, 
  onSubmit, 
  onCancel,
  lembagaList = [],
  kelasList = [],
  statusRumahList = [],
  tinggalBersamaList = []
}: BiodataSiswaFormProps) {
  const [formData, setFormData] = useState({
    namaLengkap: initialData?.namaLengkap || "",
    jenisKelamin: initialData?.jenisKelamin || "MALE",
    nisn: initialData?.nisn || "",
    nik: initialData?.nik || "",
    noKk: initialData?.noKk || "",
    lembagaId: initialData?.lembagaId || "",
    kelasId: initialData?.kelasId || "",
    tempatLahir: initialData?.tempatLahir || "",
    tanggalLahir: initialData?.tanggalLahir || "",
    namaAyah: initialData?.namaAyah || "",
    namaIbu: initialData?.namaIbu || "",
    namaWali: initialData?.namaWali || "",
    catatan: initialData?.catatan || "",
    agama: initialData?.agama || "ISLAM",
    citaCita: initialData?.citaCita || "",
    hobi: initialData?.hobi || "",
    jumlahSaudara: initialData?.jumlahSaudara || 0,
    anakKe: initialData?.anakKe || 1,
    penyakit: initialData?.penyakit || "",
    tinggalBersamaId: initialData?.tinggalBersamaId || "",
    statusRumahId: initialData?.statusRumahId || "",
    alamat: initialData?.alamat || "",
    namaSekolah: initialData?.pendidikanSebelumnya?.namaSekolah || "",
    npsn: initialData?.pendidikanSebelumnya?.npsn || "",
    alamatSekolah: initialData?.pendidikanSebelumnya?.alamatSekolah || "",
    tahunLulus: initialData?.pendidikanSebelumnya?.tahunLulus || "",
    nilaiRataRata: initialData?.pendidikanSebelumnya?.nilaiRataRata || "",
    pendidikanCatatan: initialData?.pendidikanSebelumnya?.catatan || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const isReadOnly = !isEdit;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 1. Bio Utama */}
      <BioUtamaSection 
        formData={formData} 
        onChange={handleChange} 
        isReadOnly={isReadOnly} 
        lembagaList={lembagaList} 
        kelasList={kelasList} 
      />

      {/* 2. Bio Detail */}
      <BioDetailSection 
        formData={formData} 
        onChange={handleChange} 
        isReadOnly={isReadOnly} 
        statusRumahList={statusRumahList} 
        tinggalBersamaList={tinggalBersamaList} 
      />

      {/* 3. Pendidikan Sebelumnya */}
      <PendidikanSebelumnyaSection 
        formData={formData} 
        onChange={handleChange} 
        isReadOnly={isReadOnly} 
      />

      {/* 4. Keluarga (Readonly di kedua mode) */}
      <KeluargaSection 
        formData={formData} 
        onChange={handleChange} 
      />

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