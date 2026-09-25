// apps/admin/src/components/admin/PhoneInput.tsx
"use client";

import { Input } from "../core/input"; // Sesuaikan path import core input Anda
import type { InputHTMLAttributes } from "react";

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export function PhoneInput({ value, onChange, readOnly = false, className = "", ...props }: PhoneInputProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Hanya izinkan angka (menghapus huruf, spasi, atau simbol lain selain digit)
    const numericValue = rawValue.replace(/\D/g, "").slice(0, 15); // Maksimal 15 digit standar internasional/lokal

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
      inputMode="tel"
      value={value}
      onChange={handlePhoneChange}
      readOnly={readOnly}
      placeholder="08xxxxxxxxxx"
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