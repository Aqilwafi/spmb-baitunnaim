// apps/admin/src/components/admin/inputs/NamaLengkapInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface NamaLengkapInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function NamaLengkapInput({ value, onChange, readOnly = false, className = "", ...props }: NamaLengkapInputProps) {
  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Hanya izinkan huruf (termasuk karakter beraksen), spasi, tanda titik (.), koma (,), tanda petik ('), dan strip (-)
    // Karakter angka atau simbol aneh lainnya akan otomatis dibersihkan.
    const filteredValue = rawValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,'-]/g, "");

    // Buat event tiruan (synthetic event) agar kompatibel dengan handler standar form
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: filteredValue,
      },
    };

    onChange(syntheticEvent);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleNamaChange}
      readOnly={readOnly}
      placeholder="Masukkan nama lengkap sesuai KTP"
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