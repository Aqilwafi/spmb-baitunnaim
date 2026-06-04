'use client';

import { useMemo } from 'react';
import { Input } from '@bn/ui';
import { Label } from '@bn/ui';
import { Select } from '@bn/ui';
import { User, School, GraduationCap, Lock } from 'lucide-react';
import { checkIsMI, isClassFieldLocked } from '@/helpers/registrationHelper';
import { SelectOption } from '@bn/types';

interface InitFormPendaftaranProps {
  lembaga: SelectOption[];
  kelas: SelectOption[];
  selectedLembagaCode: string;
  onLembagaChange: (code: string) => void;
}

export function InitFormPendaftaran({
  lembaga,
  kelas,
  selectedLembagaCode,
  onLembagaChange,
}: InitFormPendaftaranProps) {

  const isMI = useMemo(
    () => checkIsMI(selectedLembagaCode, lembaga),
    [selectedLembagaCode, kelas]
  );
  const isLocked = useMemo(
    () => isClassFieldLocked(selectedLembagaCode, isMI),
    [selectedLembagaCode, isMI]
  );

  const lembagaOptions = masterLembaga.map((item) => ({
    value: item.code,
    label: item.label ?? item.code,
  }));

  const kelasOptions = masterKelas
    .filter((k) => k.code)
    .map((item) => ({ value: String(item.code), label: item.label ?? item.code }));
    
  return (
    <div className="space-y-5">

      {/* Nama Lengkap */}
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
          className="px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
        />
      </div>

      {/* Lembaga Tujuan */}
      <div className="space-y-2">
        <Label className="text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
          <School size={14} className="text-blue-600" />
          LEMBAGA TUJUAN
        </Label>
        <Select
          name="lembaga_tujuan_id"
          required
          placeholder="Pilih Lembaga"
          options={lembagaOptions}
          value={selectedLembagaCode}
          onChange={(e) => onLembagaChange(e.target.value)}
          className="px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500"
        />
      </div>

      {/* Jenis Kelamin & Kelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Jenis Kelamin */}
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
            className="px-5 py-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500"
          />
        </div>

        {/* Kelas */}
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
            options={isLocked ? [{ value: '1', label: 'Non-MI' }] : kelasOptions}
            className={`px-5 py-4 rounded-2xl transition-all ${
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