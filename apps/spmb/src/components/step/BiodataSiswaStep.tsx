"use client";

import { useState } from "react";
import {
  User,
  Home,
  Heart,
  Stethoscope,
  School,
  Loader2,
} from "lucide-react";
import { Input, Select, Label, Textarea } from "@bn/ui";
import type { MasterData } from "@bn/types";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

interface BiodataSiswaDetailForm {
  no_kk: string;
  anak_ke: number | "";
  jumlah_saudara: number | "";
  hobi: string;
  cita_cita: string;
  penyakit: string;
  alamat: string;
  tinggal_bersama_id: number | "";
  status_rumah_id: number | "";
}

interface PendidikanSebelumnyaForm {
  belum_pernah_sekolah: boolean;
  nisn: string;
  nama_sekolah: string;
  npsn: string;
  alamat_sekolah: string;
  tahun_lulus: number | "";
  nilai_rata_rata: number | "";
  catatan: string;
}

interface BiodataSiswaLengkapFormProps {
  biodataSiswaId: string;
  masterTinggalBersama: MasterData[];
  masterStatusRumah: MasterData[];
  onSubmit: (data: {
    detail: BiodataSiswaDetailForm;
    pendidikan: PendidikanSebelumnyaForm;
  }) => Promise<void> | void;
}

const initialDetail: BiodataSiswaDetailForm = {
  no_kk: "",
  anak_ke: "",
  jumlah_saudara: "",
  hobi: "",
  cita_cita: "",
  penyakit: "",
  alamat: "",
  tinggal_bersama_id: "",
  status_rumah_id: "",
};

const initialPendidikan: PendidikanSebelumnyaForm = {
  belum_pernah_sekolah: false,
  nisn: "",
  nama_sekolah: "",
  npsn: "",
  alamat_sekolah: "",
  tahun_lulus: "",
  nilai_rata_rata: "",
  catatan: "",
};

export default function BiodataSiswaLengkapForm({
  masterTinggalBersama,
  masterStatusRumah,
  onSubmit,
}: BiodataSiswaLengkapFormProps) {
  const [detail, setDetail] = useState<BiodataSiswaDetailForm>(initialDetail);
  const [pendidikan, setPendidikan] = useState<PendidikanSebelumnyaForm>(initialPendidikan);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateDetail = <K extends keyof BiodataSiswaDetailForm>(key: K, value: BiodataSiswaDetailForm[K]) => {
    setDetail((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updatePendidikan = <K extends keyof PendidikanSebelumnyaForm>(key: K, value: PendidikanSebelumnyaForm[K]) => {
    setPendidikan((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setPendidikan((prev) => ({
      ...prev,
      belum_pernah_sekolah: checked,
      // Jika belum pernah sekolah, 4 field di bawah ini otomatis di-null/kosongkan
      nama_sekolah: checked ? "" : prev.nama_sekolah,
      npsn: checked ? "" : prev.npsn,
      nisn: checked ? "" : prev.nisn,
      alamat_sekolah: checked ? "" : prev.alamat_sekolah,
      catatan: checked ? prev.catatan : "",
    }));
    setErrors((prev) => ({
      ...prev,
      nama_sekolah: "",
      npsn: "",
      nisn: "",
      alamat_sekolah: "",
      catatan: "",
    }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    
    // Validasi Kartu Keluarga
    if (!detail.no_kk.trim()) next.no_kk = "Nomor KK wajib diisi";
    else if (!/^\d{16}$/.test(detail.no_kk.trim())) next.no_kk = "Nomor KK harus 16 digit angka";
    
    // Validasi Detail Pribadi
    if (detail.anak_ke === "" || Number(detail.anak_ke) < 1) next.anak_ke = "Anak ke- minimal 1";
    if (detail.jumlah_saudara === "" || Number(detail.jumlah_saudara) < 0) next.jumlah_saudara = "Jumlah saudara tidak boleh negatif";
    if (!detail.hobi.trim()) next.hobi = "Hobi wajib diisi";
    if (!detail.cita_cita.trim()) next.cita_cita = "Cita-cita wajib diisi";
    if (!detail.tinggal_bersama_id) next.tinggal_bersama_id = "Pilih status tinggal bersama";
    if (!detail.status_rumah_id) next.status_rumah_id = "Pilih status rumah";

    // Validasi Pendidikan Sebelumnya
    if (!pendidikan.belum_pernah_sekolah) {
      if (!pendidikan.nama_sekolah.trim()) next.nama_sekolah = "Nama sekolah wajib diisi";
      
      if (!pendidikan.npsn.trim()) next.npsn = "NPSN wajib diisi";
      else if (!/^\d{8}$/.test(pendidikan.npsn.trim())) next.npsn = "NPSN harus 8 digit angka";

      if (!pendidikan.nisn.trim()) next.nisn = "NISN wajib diisi";
      else if (!/^\d{10}$/.test(pendidikan.nisn.trim())) next.nisn = "NISN harus 10 digit angka";

      if (!pendidikan.alamat_sekolah.trim()) next.alamat_sekolah = "Alamat sekolah wajib diisi";
    } else {
      if (!pendidikan.catatan.trim()) next.catatan = "Catatan wajib diisi jika belum pernah sekolah";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try { await onSubmit({ detail, pendidikan }); } finally { setIsSubmitting(false); }
  };

  const inputBase = "px-5 py-4 rounded-2xl border border-gray-200 bg-white text-gray-800 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelBase = "text-[11px] font-black text-gray-400 ml-1 flex items-center gap-2 uppercase tracking-wider mb-2";
  const errorText = "text-[11px] text-red-500 font-semibold ml-1 mt-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <h2 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">
          <User size={16} className="text-blue-500" /> Biodata Siswa Lengkap
        </h2>

        {/* No KK */}
        <div className="space-y-1">
          <Label className={labelBase}><Home size={14} /> Nomor Kartu Keluarga (KK)</Label>
          <Input className={inputBase} value={detail.no_kk} onChange={(e) => updateDetail("no_kk", e.target.value)} placeholder="16 digit angka" />
          {errors.no_kk && <p className={errorText}>{errors.no_kk}</p>}
        </div>

        {/* Anak ke & Jumlah Saudara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <Label className={labelBase}>Anak ke-</Label>
            <Input type="number" className={inputBase} value={detail.anak_ke} onChange={(e) => updateDetail("anak_ke", e.target.value === "" ? "" : Number(e.target.value))} />
            {errors.anak_ke && <p className={errorText}>{errors.anak_ke}</p>}
          </div>
          <div className="space-y-1">
            <Label className={labelBase}>Jumlah Saudara</Label>
            <Input type="number" className={inputBase} value={detail.jumlah_saudara} onChange={(e) => updateDetail("jumlah_saudara", e.target.value === "" ? "" : Number(e.target.value))} />
            {errors.jumlah_saudara && <p className={errorText}>{errors.jumlah_saudara}</p>}
          </div>
        </div>

        {/* Hobi & Cita-cita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
           <div className="space-y-1">
            <Label className={labelBase}><Heart size={14} /> Hobi</Label>
            <Input className={inputBase} value={detail.hobi} onChange={(e) => updateDetail("hobi", e.target.value)} />
            {errors.hobi && <p className={errorText}>{errors.hobi}</p>}
           </div>
           <div className="space-y-1">
            <Label className={labelBase}>Cita-cita</Label>
            <Input className={inputBase} value={detail.cita_cita} onChange={(e) => updateDetail("cita_cita", e.target.value)} />
            {errors.cita_cita && <p className={errorText}>{errors.cita_cita}</p>}
           </div>
        </div>

        {/* Penyakit & Alamat (Alamat sekarang Opsional) */}
        <div className="space-y-1">
            <Label className={labelBase}><Stethoscope size={14} /> Riwayat Penyakit</Label>
            <Textarea className={inputBase} value={detail.penyakit} onChange={(e) => updateDetail("penyakit", e.target.value)} placeholder="Boleh dikosongkan jika tidak ada" />
        </div>
        <div className="space-y-1">
            <Label className={labelBase}>Alamat Siswa</Label>
            <Textarea className={inputBase} value={detail.alamat} onChange={(e) => updateDetail("alamat", e.target.value)} placeholder="Boleh dikosongkan (Opsional)" />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
           <div className="space-y-1">
            <Label className={labelBase}>Tinggal Bersama</Label>
            <Select 
              className={inputBase} 
              value={detail.tinggal_bersama_id} 
              options={masterTinggalBersama || []} 
              onChange={(e) => updateDetail("tinggal_bersama_id", Number(e.target.value))} 
              placeholder="Pilih..." 
            />
            {errors.tinggal_bersama_id && <p className={errorText}>{errors.tinggal_bersama_id}</p>}
           </div>
           <div className="space-y-1">
            <Label className={labelBase}>Status Rumah</Label>
            <Select 
              className={inputBase} 
              value={detail.status_rumah_id} 
              options={masterStatusRumah || []} 
              onChange={(e) => updateDetail("status_rumah_id", Number(e.target.value))} 
              placeholder="Pilih..." 
            />
            {errors.status_rumah_id && <p className={errorText}>{errors.status_rumah_id}</p>}
           </div>
        </div>
      </div>

      {/* Pendidikan Sebelumnya */}
      <div className="space-y-6 pt-6 border-t border-dashed border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-gray-700 uppercase flex items-center gap-2">
            <School size={16} className="text-blue-500" /> Pendidikan Sebelumnya
          </h2>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 cursor-pointer">
            <input type="checkbox" checked={pendidikan.belum_pernah_sekolah} onChange={(e) => handleCheckboxChange(e.target.checked)} />
            Belum pernah sekolah
          </label>
        </div>

        {pendidikan.belum_pernah_sekolah ? (
          <div className="space-y-1">
            <Label className={labelBase}>Catatan</Label>
            <Textarea className={inputBase} value={pendidikan.catatan} onChange={(e) => updatePendidikan("catatan", e.target.value)} placeholder="Tulis alasan atau catatan di sini..." />
            {errors.catatan && <p className={errorText}>{errors.catatan}</p>}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="space-y-1">
                  <Label className={labelBase}>Nama Sekolah</Label>
                  <Input className={inputBase} value={pendidikan.nama_sekolah} onChange={(e) => updatePendidikan("nama_sekolah", e.target.value)} />
                  {errors.nama_sekolah && <p className={errorText}>{errors.nama_sekolah}</p>}
               </div>
               <div className="space-y-1">
                  <Label className={labelBase}>NPSN</Label>
                  <Input className={inputBase} value={pendidikan.npsn} onChange={(e) => updatePendidikan("npsn", e.target.value)} placeholder="8 digit angka" />
                  {errors.npsn && <p className={errorText}>{errors.npsn}</p>}
               </div>
            </div>
            
            {/* NISN dipindahkan ke bagian bawah (Pendidikan Sebelumnya) */}
            <div className="space-y-1">
               <Label className={labelBase}>NISN</Label>
               <Input className={inputBase} value={pendidikan.nisn} onChange={(e) => updatePendidikan("nisn", e.target.value)} placeholder="10 digit angka" />
               {errors.nisn && <p className={errorText}>{errors.nisn}</p>}
            </div>

            {/* Alamat Sekolah Sebelumnya di paling bawah */}
            <div className="space-y-1">
               <Label className={labelBase}>Alamat Sekolah Sebelumnya</Label>
               <Textarea className={inputBase} value={pendidikan.alamat_sekolah} onChange={(e) => updatePendidikan("alamat_sekolah", e.target.value)} />
               {errors.alamat_sekolah && <p className={errorText}>{errors.alamat_sekolah}</p>}
            </div>
          </div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold transition flex items-center justify-center gap-2 hover:bg-blue-700">
        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : "Simpan Biodata"}
      </button>
    </form>
  );
} 