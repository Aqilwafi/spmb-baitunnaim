// apps/admin/src/components/admin/inputs/NisnInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface NisnInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function NisnInput({ value, onChange, readOnly = false, className = "", ...props }: NisnInputProps) {
  const handleNisnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Hanya izinkan angka (regex: \D menangkap selain angka) dan batasi maksimal 10 karakter
    const numericValue = rawValue.replace(/\D/g, "").slice(0, 10);

    // Buat event tiruan (synthetic event) agar kompatibel dengan handler standar form
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: numericValue,
      },
    };

    onChange(syntheticEvent);
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleNisnChange}
      readOnly={readOnly}
      maxLength={10}
      placeholder="Nomor Induk Siswa Nasional (10 digit)"
      className={`
        w-full px-3.5 py-2 text-sm transition-colors
        ${readOnly 
          ? "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed" 
          : "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        }
        ${className}
      `}
      {...props}
    />
  );
}