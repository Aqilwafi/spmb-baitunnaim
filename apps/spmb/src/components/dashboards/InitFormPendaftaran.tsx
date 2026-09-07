'use client';

import { useState, useMemo } from 'react';
import { Input, Label, Select } from '@bn/ui';
import { User, School, GraduationCap, Lock, IdCard, MapPin, Calendar } from 'lucide-react';
import { checkIsMI, isClassFieldLocked } from '@/helpers/biodata-rules';
import { InitFormPendaftaranProps } from '@/types/form.types';

export function InitFormPendaftaran({
  lembaga,
  kelas,
  selectedLembagaId,
  onLembagaChange,
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
        <Label htmlFor="nama_lengkap" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
          <User size={14} className="text-blue-600 shrink-0" />
          <span>NAMA LENGKAP SISWA</span>
        </Label>
        <Input
          id="nama_lengkap"
          name="nama_lengkap"
          type="text"
          required
          placeholder="Masukkan nama sesuai akta"
          className={inputBaseClass}
        />
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
            name="nik"
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
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1">
            JENIS KELAMIN
          </Label>
          <Select
            name="jenis_kelamin"
            required
            placeholder="Pilih"
            options={[
              { value: 1, label: 'Laki-laki', code: 'MALE' },
              { value: 2, label: 'Perempuan', code: 'FEMALE'},
            ]}
            className={inputBaseClass}
          />
        </div>
      </div>

      {/* Row 3: Tempat & Tanggal Lahir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="tempat_lahir" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <MapPin size={14} className="text-blue-600 shrink-0" />
            <span>TEMPAT LAHIR</span>
          </Label>
          <Input
            id="tempat_lahir"
            name="tempat_lahir"
            type="text"
            required
            placeholder="Kota/Kabupaten lahir"
            className={inputBaseClass}
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="tanggal_lahir" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-blue-600 shrink-0" />
            <span>TANGGAL LAHIR</span>
          </Label>
          <Input
            id="tanggal_lahir"
            name="tanggal_lahir"
            type="date"
            required
            max={todayDate}
            className={inputBaseClass}
          />
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
            name="lembaga_tujuan_id"
            required
            placeholder="Pilih Lembaga"
            options={lembaga}
            value={selectedLembagaId}
            onChange={(e) => onLembagaChange(Number(e.target.value))}
            className={inputBaseClass}
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <GraduationCap size={14} className="text-blue-600 shrink-0" />
            <span>KELAS</span>
            {isLocked && <Lock size={12} className="text-amber-500 shrink-0" />}
          </Label>
          {isLocked && <input type="hidden" name="kelas_mi_id" value="1" />}
          <Select
            name={isLocked ? undefined : 'kelas_mi_id'}
            required={!isLocked}
            disabled={isLocked}
            placeholder={isLocked ? undefined : 'Pilih Kelas'}
            value={isLocked ? '1' : undefined}
            options={isLocked ? [{ value: 1, label: 'Non-MI' }] : kelas}
            className={`${inputBaseClass} ${
              isLocked
                ? '!bg-gray-100 !text-gray-400 !border-gray-100 cursor-not-allowed italic'
                : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}