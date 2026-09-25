// apps/admin/src/components/admin/NikInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface NikInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function NikInput({ value, onChange, readOnly = false, className = "", ...props }: NikInputProps) {
  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onChange={handleNikChange}
      readOnly={readOnly}
      maxLength={16}
      placeholder="Nomor Induk Kependudukan (16 digit)"
      className={`
        w-full px-3.5 py-2 text-sm transition-colors
        ${readOnly 
          ? "bg-gray-50 text-gray-500 cursor-not-allowed" 
          : "bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        }
        ${className}
      `}
      {...props}
    />
  );
}