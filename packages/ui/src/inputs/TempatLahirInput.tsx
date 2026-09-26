// @bn/ui packages/ui/src/inputs/TempatLahirInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface TempatLahirInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function TempatLahirInput({ value, onChange, readOnly = false, className = "", ...props }: TempatLahirInputProps) {
  const handleTempatLahirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Berdasarkan Zod regex: /^[a-zA-Z0-9\s.,()-]+$/
    // Hanya izinkan huruf (termasuk karakter beraksen), angka, spasi, titik (.), koma (,), tanda kurung (()), dan strip (-)
    const filteredValue = rawValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()-]/g, "");

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
      onChange={handleTempatLahirChange}
      readOnly={readOnly}
      placeholder="Masukkan kota/kabupaten lahir"
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