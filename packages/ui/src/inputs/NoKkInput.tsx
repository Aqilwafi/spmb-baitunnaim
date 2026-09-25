// apps/admin/src/components/admin/inputs/NoKkInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface NoKkInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function NoKkInput({ value, onChange, readOnly = false, className = "", ...props }: NoKkInputProps) {
  const handleNoKkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Hanya izinkan angka (regex: \D menangkap selain angka) dan batasi maksimal 16 karakter
    const numericValue = rawValue.replace(/\D/g, "").slice(0, 16);

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
      onChange={handleNoKkChange}
      readOnly={readOnly}
      maxLength={16}
      placeholder="Nomor Kartu Keluarga (16 digit)"
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