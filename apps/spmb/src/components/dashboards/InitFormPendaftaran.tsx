'use client';

import { useState, useMemo } from 'react';
import { Input, Label, Select } from '@bn/ui';
import { User, School, GraduationCap, Lock, IdCard, MapPin, Calendar } from 'lucide-react';
import { checkIsMI, isClassFieldLocked } from '@/helpers/biodata-rules';
import { InitFormPendaftaranModalProps } from '@/types/form.types';

interface InitFormPendaftaranProps extends InitFormPendaftaranModalProps {
  selectedLembagaId: number | undefined;
  onLembagaChange: (id: number) => void;
  // Opsional: Untuk menampilkan error dari useActionState
  errors?: Record<string, string[]>; 
}

export function InitFormPendaftaran({
  lembaga,
  kelas,
  selectedLembagaId,
  onLembagaChange,
  errors,
}: InitFormPendaftaranProps) {
  const [nik, setNik] = useState('');

  const isMI = useMemo(
    () => checkIsMI(selectedLembagaId),
    [selectedLembagaId]
  );
  const isLocked = useMemo(
    () => isClassFieldLocked(selectedLembagaId, isMI),
    [selectedLembagaId, isMI]
  );

  // Sanitasi NIK hanya angka & maksimal 16 digit
  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/\D/g, '').slice(0, 16);
    setNik(sanitized);
  };

  const isNikValid = nik.length === 16;
  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const inputBaseClass =
    'w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 text-sm sm:text-base transition-colors';

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Row 1: Nama Lengkap */}
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="namaLengkap" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
          <User size={14} className="text-blue-600 shrink-0" />
          <span>NAMA LENGKAP SISWA</span>
        </Label>
        <Input
          id="namaLengkap"
          name="namaLengkap" // Ubah ke camelCase
          type="text"
          required
          placeholder="Masukkan nama sesuai akta"
          className={inputBaseClass}
        />
        {errors?.namaLengkap && (
          <p className="text-[10px] text-red-500 ml-1">{errors.namaLengkap[0]}</p>
        )}
      </div>

      {/* Row 2: NIK & Jenis Kelamin */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between items-center ml-1">
            <Label htmlFor="nik" className="text-xs sm:text-[13px] font-bold text-gray-600 flex items-center gap-2">
              <IdCard size={14} className="text-blue-600 shrink-0" />
              <span>NIK (NOMOR INDUK KEPENDUDUKAN)</span>
            </Label>
            <span className={`text-[10px] font-semibold ${isNikValid ? "text-green-600" : "text-gray-400"}`}>
              {nik.length}/16 digit
            </span>
          </div>
          <Input
            id="nik"
            name="nik" // Tetap nik
            type="text"
            inputMode="numeric"
            required
            maxLength={16}
            value={nik}
            onChange={handleNikChange}
            placeholder="Masukkan 16 digit NIK"
            className={`${inputBaseClass} ${
              nik && !isNikValid ? 'border-red-300 bg-red-50/20 focus:border-red-500' : ''
            }`}
          />
          {nik && !isNikValid && (
            <p className="text-[10px] text-red-500 ml-1">NIK harus tepat 16 digit angka.</p>
          )}
          {errors?.nik && (
            <p className="text-[10px] text-red-500 ml-1">{errors.nik[0]}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1">
            JENIS KELAMIN
          </Label>
          <Select
            name="gender" // Ubah ke camelCase (gender)
            required
            placeholder="Pilih"
            options={[
              { value: 1, label: 'Laki-laki', code: 'MALE' },
              { value: 2, label: 'Perempuan', code: 'FEMALE'},
            ]}
            className={inputBaseClass}
          />
          {errors?.gender && (
            <p className="text-[10px] text-red-500 ml-1">{errors.gender[0]}</p>
          )}
        </div>
      </div>

      {/* Row 3: Tempat & Tanggal Lahir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="tempatLahir" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <MapPin size={14} className="text-blue-600 shrink-0" />
            <span>TEMPAT LAHIR</span>
          </Label>
          <Input
            id="tempatLahir"
            name="tempatLahir" // Ubah ke camelCase
            type="text"
            required
            placeholder="Kota/Kabupaten lahir"
            className={inputBaseClass}
          />
          {errors?.tempatLahir && (
            <p className="text-[10px] text-red-500 ml-1">{errors.tempatLahir[0]}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="tanggalLahir" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-blue-600 shrink-0" />
            <span>TANGGAL LAHIR</span>
          </Label>
          <Input
            id="tanggalLahir"
            name="tanggalLahir" // Ubah ke camelCase
            type="date"
            required
            max={todayDate}
            className={inputBaseClass}
          />
          {errors?.tanggalLahir && (
            <p className="text-[10px] text-red-500 ml-1">{errors.tanggalLahir[0]}</p>
          )}
        </div>
      </div>

      {/* Row 4: Lembaga & Kelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <School size={14} className="text-blue-600 shrink-0" />
            <span>LEMBAGA TUJUAN</span>
          </Label>
          <Select
            name="lembagaId" // Ubah ke camelCase
            required
            placeholder="Pilih Lembaga"
            options={lembaga}
            value={selectedLembagaId}
            onChange={(e) => onLembagaChange(Number(e.target.value))}
            className={inputBaseClass}
          />
          {errors?.lembagaId && (
            <p className="text-[10px] text-red-500 ml-1">{errors.lembagaId[0]}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
          <GraduationCap size={14} className="text-blue-600 shrink-0" />
          <span>KELAS</span>
          {isLocked && <Lock size={12} className="text-amber-500 shrink-0" />}
        </Label>

        {/* ❌ HAPUS BARIS INI: <input type="hidden" name="kelasId" value="1" /> */}

        <Select
          // Saat isLocked = true, name di-set undefined agar TIDAK ikut terkirim di FormData
          name={isLocked ? undefined : 'kelasId'} 
          required={!isLocked}
          disabled={isLocked}
          placeholder={isLocked ? 'Non-MI (Tanpa Kelas)' : 'Pilih Kelas'}
          value={isLocked ? '' : undefined}
          options={isLocked ? [] : kelas}
          className={`${inputBaseClass} ${
            isLocked
              ? '!bg-gray-100 !text-gray-400 !border-gray-100 cursor-not-allowed italic'
              : ''
          }`}
        />
        {errors?.kelasId && (
          <p className="text-[10px] text-red-500 ml-1">{errors.kelasId[0]}</p>
        )}
      </div>
      </div>
    </div>
  );
}