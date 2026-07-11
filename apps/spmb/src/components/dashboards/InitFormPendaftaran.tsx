'use client';

import { useMemo } from 'react';
import { Input, Label, Select } from '@bn/ui';
import { User, School, GraduationCap, Lock, IdCard } from 'lucide-react'; // Menambah IdCard
import { checkIsMI, isClassFieldLocked } from '@/features/pendaftaran/rules';
import { InitFormPendaftaranProps } from '@/features/pendaftaran/types';

export function InitFormPendaftaran({
  lembaga,
  kelas,
  selectedLembagaCode,
  onLembagaChange,
}: InitFormPendaftaranProps) {

  const isMI = useMemo(
    () => checkIsMI(selectedLembagaCode, lembaga),
    [selectedLembagaCode, lembaga]
  );
  const isLocked = useMemo(
    () => isClassFieldLocked(selectedLembagaCode, isMI),
    [selectedLembagaCode, isMI]
  );
    
  return (
    <div className="space-y-5">

      {/* Row 1: Nama Lengkap (Paling Atas) */}
      <div className="space-y-2">
        <Label htmlFor="nama_lengkap" className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
          <User size={14} className="text-blue-600" />
          NAMA LENGKAP SISWA
        </Label>
        <Input
          id="nama_lengkap"
          name="nama_lengkap"
          type="text"
          required
          placeholder="Masukkan nama sesuai akta"
          className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
        />
      </div>

      {/* Row 2: NIK & Jenis Kelamin */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-5">
        <div className="space-y-2">
          <Label htmlFor="nik" className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <IdCard size={14} className="text-blue-600" />
            NIK (NOMOR INDUK KEPENDUDUKAN)
          </Label>
          <Input
            id="nik"
            name="nik"
            type="text"
            required
            maxLength={16}
            placeholder="Masukkan 16 digit NIK"
            className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-600 ml-1">
            JENIS KELAMIN
          </Label>
          <Select
            name="jenis_kelamin"
            required
            placeholder="Pilih"
            options={[
              { value: 'L', label: 'Laki-laki' },
              { value: 'P', label: 'Perempuan' },
            ]}
            className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 3: Lembaga & Kelas (Bawah) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <School size={14} className="text-blue-600" />
            LEMBAGA TUJUAN
          </Label>
          <Select
            name="lembaga_tujuan_id"
            required
            placeholder="Pilih Lembaga"
            options={lembaga}
            value={selectedLembagaCode}
            onChange={(e) => onLembagaChange(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <GraduationCap size={14} className="text-blue-600" />
            KELAS
            {isLocked && <Lock size={12} className="text-amber-500" />}
          </Label>
          {isLocked && <input type="hidden" name="kelas_mi_id" value="1" />}
          <Select
            name={isLocked ? undefined : 'kelas_mi_id'}
            required
            disabled={isLocked}
            placeholder={isLocked ? undefined : 'Pilih Kelas'}
            value={isLocked ? '1' : undefined}
            options={isLocked ? [{ value: '1', label: 'Non-MI' }] : kelas}
            className={`w-full px-5 py-4 rounded-2xl transition-all ${
              isLocked
                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed italic'
                : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500'
            }`}
          />
        </div>
      </div>
    </div>
  );
}